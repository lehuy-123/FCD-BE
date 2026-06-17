const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB Database!
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Seeding Initial Data if Database is Empty
const Product = require('./models/Product');
const Project = require('./models/Project');
const seedDatabase = async () => {
    try {
        const productCount = await Product.countDocuments();
        if (productCount === 0) {
            console.log("Database empty of products. Seeding initial products...");
            await Product.insertMany([
                {
                    name: "Aluminium Extrusion Profile",
                    description: "High-grade 6061 aluminium extrusion profiles for structural framework and architectural facades.",
                    price: 450000,
                    image: "https://images.unsplash.com/photo-1600373070442-de872dc91a27?q=80&w=1000&auto=format&fit=crop",
                    category: "Structural",
                    specs: { "Alloy": "6061-T6", "Length": "6m", "Finish": "Mill Finish" }
                },
                {
                    name: "Aluminium Composite Panel (ACP)",
                    description: "Premium ACP with a fire-resistant core for modern building cladding, signage, and interior decoration.",
                    price: 850000,
                    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1000&auto=format&fit=crop",
                    category: "Materials",
                    specs: { "Thickness": "4mm", "Panel Size": "1220x2440mm", "Core": "Fire-Resistant (FR)" }
                },
                {
                    name: "Premium Aluminium Window Frame",
                    description: "Thermally broken aluminium window frames offering superior insulation, durability, and sleek aesthetics.",
                    price: 1250000,
                    image: "https://images.unsplash.com/photo-1616423641400-94d0dc71f833?q=80&w=1000&auto=format&fit=crop",
                    category: "Interior",
                    specs: { "Type": "Casement", "Glass": "Double Glazed", "Color": "Matte Black" }
                },
                {
                    name: "Anodized Aluminium Sheet",
                    description: "Corrosion-resistant anodized aluminium sheets perfect for roofing, flashing, and custom fabrication.",
                    price: 620000,
                    image: "https://images.unsplash.com/photo-1534067272895-c1e1491cf65a?q=80&w=1000&auto=format&fit=crop",
                    category: "Materials",
                    specs: { "Thickness": "2mm", "Anodized Layer": "15 Microns", "Grade": "5052" }
                }
            ]);
            console.log("Product seeding complete.");
        }

        const projectCount = await Project.countDocuments();
        if (projectCount === 0) {
            console.log("Database empty of projects. Seeding initial projects...");
            const projectsData = [
              {
                title: "Trung tâm Thương mại Skyline",
                category: "Thương mại",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
                location: "Trung tâm Metropolis, NY",
                client: "Skyline Investments LLC",
                completion_date: "Tháng 8, 2025",
                description: "Trung tâm Thương mại Skyline là một tòa nhà cao tầng thương mại hiện đại được thiết kế để thúc đẩy đổi mới và hợp tác. Tính toàn vẹn của cấu trúc dựa nhiều vào thép cao cấp và các công thức xi măng cao cấp. Tòa nhà có hệ thống quản lý năng lượng thông minh, mặt dựng kính từ trần đến sàn để lấy ánh sáng tự nhiên và bãi đậu xe ngầm nhiều tầng. Đội ngũ của chúng tôi đã tham gia sâu vào việc xây dựng cấu trúc và cung cấp vật liệu cốt lõi."
              },
              {
                title: "Khu Phức hợp Nhà ở Emerald",
                category: "Dân dụng",
                image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2000&auto=format&fit=crop",
                location: "Westside Valley, CA",
                client: "Emerald Real Estate Group",
                completion_date: "Tháng 3, 2024",
                description: "Một khu phức hợp nhà ở sang trọng kết hợp thẩm mỹ đô thị hiện đại với cơ sở hạ tầng thân thiện với môi trường. Dự án trải rộng trên 20 mẫu Anh và bao gồm 5 tòa tháp kết nối với nhau. Chúng tôi đã cung cấp toàn bộ bê tông móng và vật liệu gia cường cấu trúc, đảm bảo các tiêu chuẩn chống động đất cao nhất."
              },
              {
                title: "Trung tâm Công nghệ Nexus",
                category: "Thương mại",
                image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=2000&auto=format&fit=crop",
                location: "Silicon Park, TX",
                client: "Nexus Tech Corp.",
                completion_date: "Tháng 12, 2024",
                description: "Trung tâm Công nghệ Nexus là một môi trường văn phòng rộng 500.000 foot vuông được xây dựng dành riêng cho các gã khổng lồ công nghệ hàng đầu. Với thiết kế lõi rỗng mang tính biểu tượng và hệ thống tấm kính rộng rãi, dự án này đã đẩy lùi các ranh giới của kỹ thuật kết cấu. Chúng tôi đã quản lý toàn bộ chuỗi cung ứng cho các vật liệu chuyên dụng được sử dụng trong mặt dựng."
              },
              {
                title: "Biệt thự Grand View",
                category: "Dân dụng",
                image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
                location: "Oceanfront Isle, FL",
                client: "Nhà đầu tư tư nhân",
                completion_date: "Tháng 7, 2023",
                description: "Một cộng đồng khép kín độc quyền bao gồm 45 biệt thự cao cấp. Mỗi biệt thự tự hào có bố cục kiến trúc tùy chỉnh. Công ty chúng tôi chịu trách nhiệm về công tác xây gạch chính xác, các giải pháp chống thấm và cung cấp vật liệu hoàn thiện cao cấp."
              },
              {
                title: "Trung tâm Mua sắm City Central",
                category: "Bán lẻ",
                image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=2000&auto=format&fit=crop",
                location: "Trung tâm Thành phố, IL",
                client: "Global Retail Associates",
                completion_date: "Tháng 11, 2025",
                description: "Dự kiến sẽ là điểm đến mua sắm hàng đầu ở Trung Tây, Trung tâm Mua sắm City Central trải rộng trên 1,2 triệu foot vuông. Cấu trúc sử dụng các dầm thép nặng được gia cố. Chúng tôi đóng vai trò là nhà thầu dân dụng chính tập trung vào khung xương của công trình."
              },
              {
                title: "Cầu Riverside",
                category: "Hạ tầng",
                image: "https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?q=80&w=2000&auto=format&fit=crop",
                location: "Quận Rivercross, WA",
                client: "Sở Giao thông Vận tải",
                completion_date: "Tháng 5, 2026",
                description: "Một dự án hạ tầng quan trọng nối liền hai khu thương mại lớn. Cầu Riverside là một cây cầu treo yêu cầu cáp thép cường độ cực cao và bê tông mác biển. Điều này giới thiệu khả năng của chúng tôi trong việc xử lý các công trình hạ tầng công cộng quy mô lớn với các yêu cầu về độ chính xác cực cao."
              }
            ];
            await Project.insertMany(projectsData);
            console.log("Project seeding complete.");
        }
    } catch (e) {
        console.error("Failed to seed database: ", e);
    }
};
seedDatabase();

// Route Integrations
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// Fallback Info Endpoint
app.get('/api/info', (req, res) => {
    res.json({
        name: "FACADES CONSTRUCTION",
        slogan: "Building Your Dreams with Precision",
        description: "We provide top-tier construction services and premium materials for all your building needs."
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
