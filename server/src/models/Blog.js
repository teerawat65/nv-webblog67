module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        Brand: DataTypes.STRING,         // ยี่ห้อของเรือ
        thumbnail: DataTypes.STRING,     // รูปภาพ thumbnail ของเรือ
        pictures: DataTypes.STRING,      // ภาพทั้งหมดของเรือ
        content: DataTypes.TEXT,         // รายละเอียดของเรือ
        cc: DataTypes.STRING,            // ขนาดความจุของเรือ 
        modelName: DataTypes.STRING,      // ชื่อรุ่นของเรือ
        price: DataTypes.STRING           // ไม่ระบุราคา
    });

    return Blog;
}
