const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const dns = require("dns");
        dns.setServers(["8.8.8.8", "8.8.4.4"]);

        await mongoose.connect(process.env.MONGO_URI, {
            family: 4
        });

        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;