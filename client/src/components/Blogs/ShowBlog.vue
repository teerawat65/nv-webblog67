<template>
  <div class="main-container">
    <h1>Show Blog</h1>
    <div class="blog-container">
      <div class="blog-info">
        
        <p>Brand: {{ blog.Brand }}</p>
        <p>Information: {{ blog.cc }}</p>
        <p>Model name: {{ blog.modelName }}</p>
      </div>
      <div class="blog-image">
        <!-- ใช้ content ในการแสดงรูปภาพ -->
        <div v-html="blog.content"></div>
      </div>
    </div>
    <div class="button-container">
      <button v-on:click="navigateTo('/blog/edit/'+ blog.id)">Edit</button>
      <button v-on:click="deleteBlog(blog)">Delete</button>
      <button v-on:click="navigateTo('/blogs')">Back</button>
    </div>
  </div>
</template>

<script>
import BlogsService from "@/services/BlogsService";
export default {
  data() {
    return {
      blog: null,
    };
  },
  async created() {
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogsService.show(blogId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(blog) {
      let result = confirm("Want to delete?");
      if (result) {
        try {
          await BlogsService.delete(blog);
          this.$router.push('/blogs');
        } catch (err) {
          console.log(err);
        }
      }
    }
  },
};
</script>

<style scoped>
/* สไตล์สำหรับ Container หลัก */
.main-container {
  background-color: rgb(144, 233, 233); /* ใช้ url() สำหรับภาพพื้นหลัง */
  background-repeat: no-repeat; /* ไม่ให้ภาพซ้ำ */
  background-position: center; /* จัดให้อยู่กลาง */
  background-size: cover; /* ปรับขนาดภาพให้ครอบคลุมพื้นที่ */
  padding: 20px; /* เพิ่มระยะห่างรอบๆ */
  border-radius: 8px; /* ทำมุมโค้ง */
}

/* สไตล์ของ blog-container */
.blog-container {
  display: flex;
  justify-content: space-between; /* ให้ข้อมูลและรูปภาพมีระยะห่าง */
  align-items: flex-start;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  background-color: rgba(249, 249, 249, 0.9); /* เพิ่มพื้นหลังสีอ่อนโปร่งใส */
  border-radius: 8px; /* มุมโค้งเล็กน้อย */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* เพิ่มเงาเบาๆ */
}

/* สไตล์ของส่วนข้อมูล */
.blog-info {
  flex: 1;
  padding-right: 20px;
  color: #333; /* สีตัวอักษรที่อ่านง่าย */
}

/* สไตล์ของส่วนรูปภาพ */
.blog-image {
  flex: 0 0 250px;
  display: flex;
  justify-content: center;
}

.blog-image img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  border: 1px solid #ddd; /* ขอบบางๆ สำหรับรูปภาพ */
}

/* สไตล์ของปุ่ม */
.button-container {
  display: flex;
  justify-content: flex-start;
  padding-top: 20px;
}

button {
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* เพิ่มการเปลี่ยนสีที่นุ่มนวล */
}

button:hover {
  background-color: #0056b3;
}

/* สไตล์สำหรับ h1 */
h1 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
}
</style>
