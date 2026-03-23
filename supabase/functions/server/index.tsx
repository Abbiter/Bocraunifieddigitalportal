import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ============ UTILITY FUNCTIONS ============

function generateId(): string {
  return crypto.randomUUID();
}

function generateTrackingId(prefix: string): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `${prefix}-${year}-${random}`;
}

function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

// ============ COMPLAINTS ENDPOINTS ============

// Submit a new complaint
app.post("/make-server-7cad94aa/complaints", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, serviceProvider, category, description } = body;

    if (!name || !email || !phone || !serviceProvider || !category || !description) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const id = generateId();
    const trackingId = generateTrackingId('COMP');
    const timestamp = getCurrentTimestamp();

    const complaint = {
      id,
      trackingId,
      name,
      email,
      phone,
      serviceProvider,
      category,
      description,
      status: 'Submitted',
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    // Store complaint by ID
    await kv.set(`complaint:id:${id}`, complaint);
    
    // Store tracking ID mapping
    await kv.set(`complaint:tracking:${trackingId}`, id);
    
    // Add to user's complaints list
    const userComplaints = await kv.get(`complaint:user:${email}`) || [];
    userComplaints.push(id);
    await kv.set(`complaint:user:${email}`, userComplaints);
    
    // Add to all complaints list
    const allComplaintIds = await kv.get('complaint:all') || [];
    allComplaintIds.push(id);
    await kv.set('complaint:all', allComplaintIds);

    console.log(`Complaint created successfully: ${trackingId}`);
    return c.json({ trackingId, complaint });
  } catch (error) {
    console.error('Error creating complaint:', error);
    return c.json({ error: 'Failed to submit complaint' }, 500);
  }
});

// Get a single complaint by ID
app.get("/make-server-7cad94aa/complaints/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const complaint = await kv.get(`complaint:id:${id}`);

    if (!complaint) {
      return c.json({ error: 'Complaint not found' }, 404);
    }

    return c.json({ complaint });
  } catch (error) {
    console.error('Error fetching complaint:', error);
    return c.json({ error: 'Failed to fetch complaint' }, 500);
  }
});

// Get all complaints for a user
app.get("/make-server-7cad94aa/user/complaints", async (c) => {
  try {
    const email = c.req.query('email');
    
    if (!email) {
      return c.json({ error: 'Email parameter is required' }, 400);
    }

    const complaintIds = await kv.get(`complaint:user:${email}`) || [];
    
    const complaints = [];
    for (const id of complaintIds) {
      const complaint = await kv.get(`complaint:id:${id}`);
      if (complaint) {
        complaints.push(complaint);
      }
    }

    // Sort by creation date, newest first
    complaints.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return c.json({ complaints });
  } catch (error) {
    console.error('Error fetching user complaints:', error);
    return c.json({ error: 'Failed to fetch user complaints' }, 500);
  }
});

// Get all complaints (admin)
app.get("/make-server-7cad94aa/admin/complaints", async (c) => {
  try {
    const complaintIds = await kv.get('complaint:all') || [];
    
    const complaints = [];
    for (const id of complaintIds) {
      const complaint = await kv.get(`complaint:id:${id}`);
      if (complaint) {
        complaints.push(complaint);
      }
    }

    // Sort by creation date, newest first
    complaints.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return c.json({ complaints });
  } catch (error) {
    console.error('Error fetching all complaints:', error);
    return c.json({ error: 'Failed to fetch complaints' }, 500);
  }
});

// Update complaint status (admin)
app.put("/make-server-7cad94aa/admin/complaints/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { status } = body;

    if (!status) {
      return c.json({ error: 'Status is required' }, 400);
    }

    const complaint = await kv.get(`complaint:id:${id}`);

    if (!complaint) {
      return c.json({ error: 'Complaint not found' }, 404);
    }

    complaint.status = status;
    complaint.updatedAt = getCurrentTimestamp();

    await kv.set(`complaint:id:${id}`, complaint);

    console.log(`Complaint ${id} status updated to: ${status}`);
    return c.json({ complaint });
  } catch (error) {
    console.error('Error updating complaint status:', error);
    return c.json({ error: 'Failed to update complaint status' }, 500);
  }
});

// ============ LICENSE ENDPOINTS ============

// Submit a new license application
app.post("/make-server-7cad94aa/licenses", async (c) => {
  try {
    const body = await c.req.json();
    const { companyName, registrationNumber, contactPerson, email, phone, address, licenseType } = body;

    if (!companyName || !contactPerson || !email || !phone || !licenseType) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const id = generateId();
    const trackingId = generateTrackingId('LIC');
    const timestamp = getCurrentTimestamp();

    const license = {
      id,
      trackingId,
      companyName,
      registrationNumber: registrationNumber || '',
      contactPerson,
      email,
      phone,
      address: address || '',
      licenseType,
      status: 'Submitted',
      currentStep: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    // Store license by ID
    await kv.set(`license:id:${id}`, license);
    
    // Store tracking ID mapping
    await kv.set(`license:tracking:${trackingId}`, id);
    
    // Add to user's licenses list
    const userLicenses = await kv.get(`license:user:${email}`) || [];
    userLicenses.push(id);
    await kv.set(`license:user:${email}`, userLicenses);
    
    // Add to all licenses list
    const allLicenseIds = await kv.get('license:all') || [];
    allLicenseIds.push(id);
    await kv.set('license:all', allLicenseIds);

    console.log(`License application created successfully: ${trackingId}`);
    return c.json({ trackingId, license });
  } catch (error) {
    console.error('Error creating license application:', error);
    return c.json({ error: 'Failed to submit license application' }, 500);
  }
});

// Get a single license by ID
app.get("/make-server-7cad94aa/licenses/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const license = await kv.get(`license:id:${id}`);

    if (!license) {
      return c.json({ error: 'License application not found' }, 404);
    }

    return c.json({ license });
  } catch (error) {
    console.error('Error fetching license application:', error);
    return c.json({ error: 'Failed to fetch license application' }, 500);
  }
});

// Get all licenses for a user
app.get("/make-server-7cad94aa/user/licenses", async (c) => {
  try {
    const email = c.req.query('email');
    
    if (!email) {
      return c.json({ error: 'Email parameter is required' }, 400);
    }

    const licenseIds = await kv.get(`license:user:${email}`) || [];
    
    const licenses = [];
    for (const id of licenseIds) {
      const license = await kv.get(`license:id:${id}`);
      if (license) {
        licenses.push(license);
      }
    }

    // Sort by creation date, newest first
    licenses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return c.json({ licenses });
  } catch (error) {
    console.error('Error fetching user licenses:', error);
    return c.json({ error: 'Failed to fetch user licenses' }, 500);
  }
});

// Get all licenses (admin)
app.get("/make-server-7cad94aa/admin/licenses", async (c) => {
  try {
    const licenseIds = await kv.get('license:all') || [];
    
    const licenses = [];
    for (const id of licenseIds) {
      const license = await kv.get(`license:id:${id}`);
      if (license) {
        licenses.push(license);
      }
    }

    // Sort by creation date, newest first
    licenses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return c.json({ licenses });
  } catch (error) {
    console.error('Error fetching all licenses:', error);
    return c.json({ error: 'Failed to fetch licenses' }, 500);
  }
});

// Update license status (admin)
app.put("/make-server-7cad94aa/admin/licenses/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { status } = body;

    if (!status) {
      return c.json({ error: 'Status is required' }, 400);
    }

    const license = await kv.get(`license:id:${id}`);

    if (!license) {
      return c.json({ error: 'License application not found' }, 404);
    }

    license.status = status;
    license.updatedAt = getCurrentTimestamp();

    await kv.set(`license:id:${id}`, license);

    console.log(`License ${id} status updated to: ${status}`);
    return c.json({ license });
  } catch (error) {
    console.error('Error updating license status:', error);
    return c.json({ error: 'Failed to update license status' }, 500);
  }
});

// ============ TRACKING ENDPOINT ============

// Track an item by tracking ID (searches both complaints and licenses)
app.get("/make-server-7cad94aa/tracking/:trackingId", async (c) => {
  try {
    const trackingId = c.req.param('trackingId');

    // Try to find in complaints
    const complaintId = await kv.get(`complaint:tracking:${trackingId}`);
    if (complaintId) {
      const complaint = await kv.get(`complaint:id:${complaintId}`);
      if (complaint) {
        return c.json({ item: { ...complaint, type: 'complaint' } });
      }
    }

    // Try to find in licenses
    const licenseId = await kv.get(`license:tracking:${trackingId}`);
    if (licenseId) {
      const license = await kv.get(`license:id:${licenseId}`);
      if (license) {
        return c.json({ item: { ...license, type: 'license' } });
      }
    }

    return c.json({ error: 'Tracking ID not found' }, 404);
  } catch (error) {
    console.error('Error tracking item:', error);
    return c.json({ error: 'Failed to track item' }, 500);
  }
});

// ============ STATISTICS ENDPOINT ============

// Get platform statistics
app.get("/make-server-7cad94aa/statistics", async (c) => {
  try {
    const complaintIds = await kv.get('complaint:all') || [];
    const licenseIds = await kv.get('license:all') || [];

    // Count resolved complaints
    let resolvedCount = 0;
    for (const id of complaintIds) {
      const complaint = await kv.get(`complaint:id:${id}`);
      if (complaint && complaint.status === 'Resolved') {
        resolvedCount++;
      }
    }

    // Count approved licenses
    let approvedLicenses = 0;
    for (const id of licenseIds) {
      const license = await kv.get(`license:id:${id}`);
      if (license && license.status === 'Approved') {
        approvedLicenses++;
      }
    }

    // Calculate average response time (mock calculation for now)
    const avgResponseDays = 2.3;

    const statistics = [
      { label: 'Complaints Resolved', value: resolvedCount.toLocaleString(), icon: 'CheckCircle' },
      { label: 'Network Coverage', value: '96.8%', icon: 'Signal' },
      { label: 'Active Licenses', value: approvedLicenses.toLocaleString(), icon: 'FileCheck' },
      { label: 'Avg Response Time', value: `${avgResponseDays} days`, icon: 'Clock' },
    ];

    return c.json({ statistics });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return c.json({ error: 'Failed to fetch statistics' }, 500);
  }
});

// Health check endpoint
app.get("/make-server-7cad94aa/health", (c) => {
  return c.json({ status: "ok" });
});

Deno.serve(app.fetch);
