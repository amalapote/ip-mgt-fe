<!-- FooterComponent.vue -->
<template>
    <footer class="bg-gray-800 text-white py-8 relative">
        <div class="container mx-auto px-6">
            <div class="flex flex-wrap justify-between">
                <!-- Logo and About Section -->
                <div class="w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 class="text-xl font-bold mb-4">My Company</h2>
                    <p>Providing quality services since 2020.</p>
                </div>
                <!-- Links Section -->
                <div class="w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 class="text-xl font-bold mb-4">Quick Links</h2>
                    <ul>
                        <li><RouterLink to="/" class="hover:text-gray-400">Home</RouterLink></li>
                        <li><RouterLink to="/about" class="hover:text-gray-400">About Us</RouterLink></li>
                        <li><RouterLink to="/services" class="hover:text-gray-400">Services</RouterLink></li>
                        <li><RouterLink to="/contact" class="hover:text-gray-400">Contact</RouterLink></li>
                    </ul>
                </div>
                <!-- Contact Section -->
                <div class="w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 class="text-xl font-bold mb-4">Contact Us</h2>
                    <ul>
                        <li>Email: info@mycompany.com</li>
                        <li>Phone: (123) 456-7890</li>
                        <li>Address: 123 Main St, Anytown, USA</li>
                    </ul>
                </div>
                <!-- Social Media Section -->
                <div class="w-full md:w-1/4">
                    <h2 class="text-xl font-bold mb-4">Follow Us</h2>
                    <div class="flex space-x-4">
                        <a href="#" class="hover:text-gray-400"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="hover:text-gray-400"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="hover:text-gray-400"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="hover:text-gray-400"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
            <div class="text-center mt-8">
                <p>&copy; 2024 My Company. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';

// If needed, define reactive data here
// For example, dynamic links or contact details
</script>

<style scoped>
/* Add any additional styles here */
</style>
