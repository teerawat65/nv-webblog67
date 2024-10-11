<template>
  <div>
    <div class="nv-navbar">
      <ul class="nav">
        <!-- อ้างอิง router-link ไปยังหน้า blogs -->
        <li><router-link :to="{ name: 'blogs' }">Boats</router-link></li>
        <li><router-link :to="{ name: 'users' }">Users</router-link></li>
        <!-- แก้ไขให้ router-link ไปยังหน้าเพิ่ม boats -->
        <li><router-link :to="{ name: 'blog-create' }">Add&Modify</router-link></li>
        <!-- ตรวจสอบสถานะ Login -->
        <li><router-link :to="{ name: 'login' }">Login</router-link></li>  
      </ul>
      <img src="../assets/logo.png" id="logo" alt="Logo">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    isLogin() {
      return this.$store.getters.isUserLoggedIn;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style scoped>
/* ปรับปรุงการจัดเรียง Navbar */
.nv-navbar {
  background-color: rgb(66, 0, 173);
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center; /* จัดกลางแนวนอน */
  justify-content: space-between; /* ทำให้ปุ่มอยู่ด้านซ้ายและโลโก้อยู่ด้านขวา */
}

.nv-navbar .nav {
  display: flex; /* ใช้ Flexbox แทนการ float */
  list-style: none;
  margin: 0;
  padding: 0;
  flex-grow: 1; /* ให้ nav ขยายเต็มพื้นที่ที่ว่าง */
  justify-content: center; /* จัดรายการอยู่ตรงกลาง */
}

.nv-navbar .nav li {
  margin: 0 15px; /* เพิ่มระยะห่างระหว่างไอเท็ม */
}

.nv-navbar .nav li a {
  padding: 10px;
  text-decoration: none;
  color: gray;
  font-weight: bold;
}

.nv-navbar .nav li a:hover {
  color: darkslategrey;
}

.nv-navbar .nav li a.router-link-active {
  background-color: rgb(0, 225, 255);
  color: darkslategrey;
  border-radius: 5px; /* เพิ่มมุมโค้งให้กับแท็บที่เลือก */
}

#logo {
  height: 50px; /* กำหนดความสูงของโลโก้ */
  margin-left: 20px; /* เพิ่มระยะห่างทางซ้ายสำหรับโลโก้ */
}
</style>
