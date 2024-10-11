<template>
  <div class="container">
    <button @click="logout" class="btn btn-primary">Logout</button>
    <h2 class="title">- Type of Boats -</h2>
    <h4 class="subtitle">Total Amount: {{ blogs.length }}</h4>

    <div v-for="blog in blogs" :key="blog.id" class="blog-container">
      <div class="blog-image">
        <div v-html="blog.content" class="image-content"></div>
        <h5 class="blog-title">{{ blog.title }}</h5>
        <p class="blog-description">{{ blog.description }}</p>
        <button @click="navigateTo('/blog/' + blog.id)" class="btn btn-info">View Details</button>
      </div>
    </div>
  </div>
</template>

<script>
import BlogsService from '@/services/BlogsService';

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      blogs: []
    };
  },
  async created() {
    this.blogs = (await BlogsService.index()).data;
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setBlog', null);
      this.$router.push({ name: 'login' });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    formatPrice(price) {
      return price !== null && price !== undefined ? `${price.toLocaleString()} บาท` : '3-15 million$';
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 20px;
}

.blog-container {
  display: flex;
  justify-content: center; /* Centering the container content */
  margin-bottom: 30px; /* Increased margin for better spacing */
  padding: 20px; /* Increased padding for larger container */
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: transform 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Added shadow for better visibility */
}

.blog-container:hover {
  transform: scale(1.02);
}

.blog-image {
  text-align: center; /* Center the image content */
}

.image-content {
  max-width: 250px; /* Set maximum width for images */
  margin: 0 auto; /* Center the image */
  border-radius: 10px;
}

.blog-title {
  font-size: 1.5rem;
  color: #007bff;
  margin-top: 10px; /* Space between image and title */
}

.blog-description {
  color: #555;
  margin: 5px 0; /* Space between title and description */
}

.btn {
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 1rem;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-info {
  background-color: #17a2b8;
  border: none;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn-info:hover {
  background-color: #138496;
}

h2,
h4 {
  text-align: center;
}
</style>
