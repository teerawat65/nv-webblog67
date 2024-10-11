<template>
  <div class="user-container">
    <h1 class="header">Get All Users</h1>
    <div class="button-container">
      <button class="primary-button" v-on:click="navigateTo('/user/create')">สร้างผู้ใช้</button>
    </div>
    <hr class="divider">
    <div v-if="users.length" class="user-list">
      <div><b>จำนวนผู้ใช้งาน:</b> {{ users.length }}</div>
      <div v-for="user in users" v-bind:key="user.id" class="user-card">
        <div class="user-info">
          <div><b>id:</b> {{ user.id }}</div>
          <div><b>ชื่อผู้ใช้:</b> {{ user.name }} {{ user.lastname }}</div>
          <div><b>อีเมล:</b> {{ user.email }}</div>
          <div><b>status:</b> {{ user.status }}</div>
          <div><b>type:</b> {{ user.type }}</div>
        </div>
        <div class="button-group">
          <button class="action-button" v-on:click="navigateTo('/user/'+user.id)">ดูข้อมูล</button>
          <button class="action-button" v-on:click="navigateTo('/user/edit/'+user.id)">แก้ไขข้อมูล</button>
          <button class="action-button delete-button" v-on:click="deleteUser(user)">ลบข้อมูล</button>
        </div>
      </div>
    </div>
    <div class="button-container">
      <button class="logout-button" v-on:click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      users: []
    }
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'login'
      })
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      try {
        this.users = (await UsersService.index()).data;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
.user-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Arial', sans-serif;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.button-container {
  margin-bottom: 20px;
}

.primary-button,
.action-button,
.logout-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.3s;
}

.primary-button:hover,
.action-button:hover,
.logout-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.divider {
  border: 1px solid #e0e0e0;
  margin: 20px 0;
}

.user-list {
  margin-top: 20px;
}

.user-card {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.user-info {
  margin-bottom: 15px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
