// backend/massSeed.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { fakerAR } = require("@faker-js/faker"); // Using Arabic locale for realistic data

dotenv.config();

const User = require("./models/User");
const Agency = require("./models/Agency");
const GasFillingOrder = require("./models/GasFillingOrder");
const HeatingServiceRequest = require("./models/HeatingServiceRequest");

const generateDataset = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB. Starting mass data generation...");

    // Optional: Clear old data to prevent massive clutter
    await User.deleteMany({});
    await Agency.deleteMany({});
    await GasFillingOrder.deleteMany({});
    await HeatingServiceRequest.deleteMany({});
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("12345678", salt);

    // 1. Create a Super Admin so you can still log in
    await User.create({
      name: "Mohammed Alsarrawi",
      email: "admin@shu3la.com",
      phone: "0790000000",
      password: hashedPassword,
      role: "admin",
      isApproved: true,
    });

    console.log("⏳ Generating Users & Agencies...");
    
    // 2. Generate 50 Users
    const users = [];
    for (let i = 0; i < 50; i++) {
      const user = await User.create({
        name: fakerAR.person.fullName(),
        email: fakerAR.internet.email(),
        phone: fakerAR.phone.number("079#######"),
        password: hashedPassword,
        role: "user",
        isApproved: true,
      });
      users.push(user);
    }

    // 3. Generate 15 Agencies
    const agencies = [];
    for (let i = 0; i < 15; i++) {
      const agencyOwner = await User.create({
        name: fakerAR.person.fullName(),
        email: `agency${i}@shu3la.com`,
        phone: fakerAR.phone.number("079#######"),
        password: hashedPassword,
        role: "agency",
        isApproved: true,
      });

      const agency = await Agency.create({
        agencyName: `وكالة ${fakerAR.company.name()} للغاز`,
        address: fakerAR.location.streetAddress(),
        phoneNumber: fakerAR.phone.number("079#######"),
        email: agencyOwner.email,
        location: `${fakerAR.location.latitude()}, ${fakerAR.location.longitude()}`,
        licenseImage: "/uploads/default-license.png",
        status: fakerAR.helpers.arrayElement(["قيد الانتظار", "مقبولة", "مرفوضة"]),
      });
      agencies.push(agency);
    }

    console.log("⏳ Generating 500 Historical Gas Orders for AI Time-Series...");

    // 4. Generate 500 Gas Filling Orders spread over the last 6 months
    const gasOrders = [];
    for (let i = 0; i < 500; i++) {
      const randomUser = fakerAR.helpers.arrayElement(users);
      
      gasOrders.push({
        userId: randomUser._id,
        fullName: randomUser.name,
        email: randomUser.email,
        phone: randomUser.phone,
        address: fakerAR.location.streetAddress(),
        quantity: fakerAR.number.int({ min: 200, max: 2000 }), // ML Feature: Target variable
        date: fakerAR.date.recent({ days: 180 }), // Spread across last 6 months
        timePreference: fakerAR.helpers.arrayElement(["صباحية", "مسائية"]),
        paymentMethod: fakerAR.helpers.arrayElement(["نقدي", "تحويل بنكي"]),
        status: fakerAR.helpers.arrayElement(["قيد الانتظار", "منتهي"]),
        createdAt: fakerAR.date.recent({ days: 180 }),
      });
    }
    await GasFillingOrder.insertMany(gasOrders);

    console.log("⏳ Generating 200 Heating Service Requests...");

    // 5. Generate 200 Heating Requests (Great for Classification Models)
    const heatingRequests = [];
    for (let i = 0; i < 200; i++) {
      const randomUser = fakerAR.helpers.arrayElement(users);
      
      heatingRequests.push({
        fullName: randomUser.name,
        phone: randomUser.phone,
        email: randomUser.email,
        message: fakerAR.lorem.sentence(),
        serviceType: fakerAR.helpers.arrayElement(["استفسار", "معاينة", "صيانة"]), // ML Feature: Categories
        status: fakerAR.helpers.arrayElement(["قيد الانتظار", "قيد التنفيذ", "منتهي", "مرفوض"]),
        requestedDate: fakerAR.date.recent({ days: 90 }),
        createdAt: fakerAR.date.recent({ days: 90 }),
      });
    }
    await HeatingServiceRequest.insertMany(heatingRequests);

    console.log("------------------------------------");
    console.log("🚀 BOOM! Database flooded with AI-ready synthetic data!");
    console.log("Total Users: 51");
    console.log("Total Agencies: 15");
    console.log("Total Orders: 500");
    console.log("Total Heating Requests: 200");
    console.log("Admin Login: admin@shu3la.com | Pass: 12345678");
    console.log("------------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error generating dataset:", error);
    process.exit(1);
  }
};

generateDataset();