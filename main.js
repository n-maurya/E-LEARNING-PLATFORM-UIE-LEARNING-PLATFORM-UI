document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Course data for programming courses
    const programmingCourses = [
        {
            id: 1,
            title: "Complete Web Developer Bootcamp",
            instructor: "Alex Johnson",
            category: "web",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            video: "https://www.youtube.com/embed/ysEN5RaKOlA",
            students: 12345,
            duration: "30 hours",
            level: "Beginner",
            rating: 4.7,
            reviews: 2345,
            description: "Learn full-stack web development with HTML, CSS, JavaScript, Node.js, React, MongoDB and more! This complete course will take you from beginner to advanced."
        },
        {
            id: 2,
            title: "Modern JavaScript From Scratch",
            instructor: "Sarah Miller",
            category: "js",
            image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            video: "https://www.youtube.com/embed/PkZNo7MFNFg",
            students: 8765,
            duration: "20 hours",
            level: "Intermediate",
            rating: 4.8,
            reviews: 1890,
            description: "Master modern JavaScript (ES6+) with this comprehensive course. Learn all the modern features you need to build real-world applications."
        },
        {
            id: 3,
            title: "Responsive Web Design Masterclass",
            instructor: "Emma Davis",
            category: "html",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            video: "https://www.youtube.com/embed/srvUrASNj0s",
            students: 15432,
            duration: "15 hours",
            level: "Beginner",
            rating: 4.6,
            reviews: 3210,
            description: "Learn responsive web design with HTML5, CSS3, Flexbox, Grid and more. Build websites that look great on all devices."
        },
        {
            id: 4,
            title: "Python for Beginners - Zero to Hero",
            instructor: "Michael Chen",
            category: "python",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            video: "https://www.youtube.com/embed/rfscVS0vtbw",
            students: 23456,
            duration: "25 hours",
            level: "Beginner",
            rating: 4.9,
            reviews: 4567,
            description: "Learn Python programming from scratch with hands-on exercises and projects. Perfect for absolute beginners."
        }
    ];

    // Modal functionality
    const modal = document.getElementById('courseModal');
    const closeModal = document.querySelector('.close-modal');
    const videoPreviews = document.querySelectorAll('.video-preview');
    const courseCards = document.querySelectorAll('.course-card');
    
    // Open modal when video preview is clicked
    videoPreviews.forEach(preview => {
        preview.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseCard = this.closest('.course-card');
            const courseIndex = Array.from(courseCards).indexOf(courseCard);
            const course = programmingCourses[courseIndex];
            
            openCourseModal(course);
        });
    });
    
    // Open modal when course card is clicked
    courseCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on video preview (already handled)
            if (!e.target.closest('.video-preview')) {
                const course = programmingCourses[index];
                openCourseModal(course);
            }
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        closeCourseModal();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCourseModal();
        }
    });
    
    function openCourseModal(course) {
        // Update modal content with course data
        document.getElementById('courseTitle').textContent = course.title;
        document.getElementById('courseInstructor').textContent = course.instructor;
        document.getElementById('courseDescription').textContent = course.description;
        document.getElementById('courseVideo').src = course.video;
        
        // Update rating
        const ratingStars = document.querySelectorAll('.rating .stars i');
        const fullStars = Math.floor(course.rating);
        const hasHalfStar = course.rating % 1 >= 0.5;
        
        ratingStars.forEach((star, index) => {
            if (index < fullStars) {
                star.className = 'fas fa-star';
            } else if (index === fullStars && hasHalfStar) {
                star.className = 'fas fa-star-half-alt';
            } else {
                star.className = 'far fa-star';
            }
        });
        
        document.querySelector('.rating span').textContent = `${course.rating} (${course.reviews.toLocaleString()} reviews)`;
        
        // Update course meta
        const courseMeta = document.querySelector('.course-meta');
        courseMeta.innerHTML = `
            <span><i class="fas fa-users"></i> ${course.students.toLocaleString()} students</span>
            <span><i class="fas fa-clock"></i> ${course.duration}</span>
            <span><i class="fas fa-signal"></i> ${course.level}</span>
        `;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeCourseModal() {
        // Pause video when closing modal
        const iframe = document.getElementById('courseVideo');
        iframe.src = iframe.src; // This reloads the iframe, effectively pausing the video
        
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            const allCourses = document.querySelectorAll('.course-card');
            
            allCourses.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const allCourses = document.querySelectorAll('.course-card');
            
            allCourses.forEach(card => {
                const title = card.querySelector('.course-title').textContent.toLowerCase();
                const instructor = card.querySelector('.course-instructor').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || instructor.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContainer = this.closest('.sections-tabs');
            
            // Remove active class from all buttons in this container
            tabContainer.querySelectorAll('.tab-btn').forEach(tb => {
                tb.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab contents in this section
            const tabContents = this.closest('.course-sections').querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected tab content
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.closest('.accordion-item');
            accordionItem.classList.toggle('active');
        });
    });
    
    // Enroll button
    const enrollBtn = document.getElementById('enrollBtn');
    if (enrollBtn) {
        enrollBtn.addEventListener('click', function() {
            this.textContent = 'Enrolled!';
            this.style.backgroundColor = '#1cc88a';
            setTimeout(() => {
                this.textContent = 'Continue Learning';
            }, 1000);
        });
    }
    
    // Rating stars in review form
    const ratingStars = document.querySelectorAll('.rating-input .stars i');
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            const starsContainer = this.parentElement;
            
            // Reset all stars
            starsContainer.querySelectorAll('i').forEach(s => {
                s.classList.remove('fas');
                s.classList.add('far');
            });
            
            // Fill stars up to the clicked one
            for (let i = 0; i < rating; i++) {
                starsContainer.querySelectorAll('i')[i].classList.remove('far');
                starsContainer.querySelectorAll('i')[i].classList.add('fas');
            }
        });
    });
    
    // Lesson navigation
    const prevLessonBtn = document.getElementById('prevLesson');
    const nextLessonBtn = document.getElementById('nextLesson');
    
    if (prevLessonBtn && nextLessonBtn) {
        prevLessonBtn.addEventListener('click', function() {
            // In a real app, this would load the previous lesson
            alert('Loading previous lesson...');
        });
        
        nextLessonBtn.addEventListener('click', function() {
            // In a real app, this would load the next lesson
            alert('Loading next lesson...');
        });
    }

    // Initialize progress chart on dashboard
    if (document.getElementById('progressChart')) {
        const ctx = document.getElementById('progressChart').getContext('2d');
        const progressChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['JavaScript', 'Python', 'UI/UX', 'Marketing', 'React', 'ML'],
                datasets: [{
                    label: 'Progress (%)',
                    data: [65, 30, 80, 45, 90, 25],
                    backgroundColor: [
                        '#4e73df',
                        '#1cc88a',
                        '#36b9cc',
                        '#f6c23e',
                        '#e74a3b',
                        '#858796'
                    ],
                    borderColor: [
                        '#4e73df',
                        '#1cc88a',
                        '#36b9cc',
                        '#f6c23e',
                        '#e74a3b',
                        '#858796'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
});