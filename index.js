/* ==========================================================================
   SalesForce SO Dashboard Scripts - Data & Interactivity
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. Initial State & Data Store
    // -------------------------------------------------------------
    const STATE = {
        checkedIn: true,
        checkInTime: "08:45 AM",
        checkOutTime: null,
        totalSalesToday: 2450.00,
        paymentsCollectedToday: 1850.00,
        activeTab: "home",
        
        dealers: [
            { id: "dl-1", name: "Dhali Super Shop", channel: "Supermarket", address: "Plot 3, Road 11, Gulshan 1, Dhaka", phone: "+880 1711-223344", lat: 23.7925, lng: 90.4078, outstanding: 1250.00, creditLimit: 5000.00, visitStatus: "visited", lastVisit: "Today, 10:15 AM" },
            { id: "dl-2", name: "Al-Amin Stores", channel: "Retailer", address: "45/A Kalachandpur, Gulshan, Dhaka", phone: "+880 1819-556677", lat: 23.8012, lng: 90.4220, outstanding: 820.00, creditLimit: 3000.00, visitStatus: "visited", lastVisit: "Today, 09:30 AM" },
            { id: "dl-3", name: "Apex MegaMart", channel: "Supermarket", address: "Sector 4, Uttara, Dhaka", phone: "+880 1912-889900", lat: 23.8652, lng: 90.4012, outstanding: 4500.00, creditLimit: 10000.00, visitStatus: "pending", lastVisit: "Yesterday" },
            { id: "dl-4", name: "Dhally Mart", channel: "Supermarket", address: "Circle 2, Gulshan, Dhaka", phone: "+880 1722-114488", lat: 23.7960, lng: 90.4150, outstanding: 0.00, creditLimit: 8000.00, visitStatus: "visited", lastVisit: "Today, 09:02 AM" },
            { id: "dl-5", name: "Shwapno Outlet", channel: "Supermarket", address: "Sector 4, Uttara, Dhaka", phone: "+880 1515-778899", lat: 23.8685, lng: 90.3980, outstanding: 2100.00, creditLimit: 15000.00, visitStatus: "visited", lastVisit: "Today, 08:50 AM" },
            { id: "dl-6", name: "Agora Retail", channel: "Wholesale", address: "Sector 9, Uttara, Dhaka", phone: "+880 1611-332211", lat: 23.8740, lng: 90.3995, outstanding: 6800.00, creditLimit: 12000.00, visitStatus: "pending", lastVisit: "3 days ago" }
        ],

        products: [
            { id: "pr-1", name: "Citrus Burst Energy Drink (250ml)", category: "beverages", price: 1.50, stock: 450, icon: "cup-soda" },
            { id: "pr-2", name: "Active Hydro Electrolyte (500ml)", category: "beverages", price: 2.20, stock: 320, icon: "droplet" },
            { id: "pr-3", name: "Crispy Potato Waves (Salted 60g)", category: "snacks", price: 0.80, stock: 1200, icon: "cookie" },
            { id: "pr-4", name: "Peanut Butter Crunch Bar (40g)", category: "snacks", price: 1.10, stock: 80, icon: "sandwich" },
            { id: "pr-5", name: "Premium Ground Coffee (250g)", category: "packaged", price: 5.50, stock: 150, icon: "coffee" },
            { id: "pr-6", name: "Oatmeal Cookies Pack (150g)", category: "packaged", price: 2.50, stock: 24, icon: "cookie" }
        ],

        todos: [
            { id: "td-1", title: "Collect outstanding payment from Apex MegaMart", category: "payment", completed: false },
            { id: "td-2", title: "Verify stock levels at Dhali Super Shop", category: "delivery", completed: true },
            { id: "td-3", title: "Deliver POS promotional stands to Al-Amin Stores", category: "delivery", completed: true },
            { id: "td-4", title: "Pitch new Coffee flavor SKU to Agora Retail manager", category: "sales", completed: false }
        ],

        attendanceHistory: [
            { date: "17 Jun 2026", checkIn: "08:35 AM", checkOut: "05:40 PM", hours: "09h 05m", status: "On Time" },
            { date: "16 Jun 2026", checkIn: "08:42 AM", checkOut: "06:12 PM", hours: "09h 30m", status: "On Time" },
            { date: "15 Jun 2026", checkIn: "09:05 AM", checkOut: "05:30 PM", hours: "08h 25m", status: "Late" },
            { date: "14 Jun 2026", checkIn: "08:30 AM", checkOut: "05:15 PM", hours: "08h 45m", status: "On Time" },
            { date: "13 Jun 2026", checkIn: "08:28 AM", checkOut: "05:32 PM", hours: "09h 04m", status: "On Time" }
        ],

        paymentHistory: [
            { id: "PAY-890", dealer: "Dhali Super Shop", dateTime: "Today, 10:15 AM", method: "Cash", amount: 650.00, status: "Approved" },
            { id: "PAY-889", dealer: "Apex MegaMart", dateTime: "Today, 08:55 AM", method: "Cheque", amount: 1200.00, status: "Pending Clearance" },
            { id: "PAY-876", dealer: "Shwapno Outlet", dateTime: "Yesterday, 04:30 PM", method: "Bank Transfer", amount: 3500.00, status: "Approved" },
            { id: "PAY-875", dealer: "Al-Amin Stores", dateTime: "16 Jun, 11:20 AM", method: "Cash", amount: 480.00, status: "Approved" }
        ],

        cart: [] // holds items: { id, name, price, qty }
    };

    let map = null;
    let mapMarkers = [];
    let activeMapDealerId = null;

    // Load states from LocalStorage if they exist to demonstrate integrity and statefulness
    if (localStorage.getItem("so_todos")) {
        STATE.todos = JSON.parse(localStorage.getItem("so_todos"));
    }
    if (localStorage.getItem("so_payments")) {
        STATE.paymentHistory = JSON.parse(localStorage.getItem("so_payments"));
    }
    if (localStorage.getItem("so_checked_in")) {
        STATE.checkedIn = localStorage.getItem("so_checked_in") === "true";
    }

    // -------------------------------------------------------------
    // 2. Global Utilities & DOM Helpers
    // -------------------------------------------------------------
    function updateClock() {
        const now = new Date();
        
        // Formatting options
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
        const timeStr = now.toLocaleTimeString('en-US', timeOptions);
        const dateStr = now.toLocaleDateString('en-US', dateOptions);

        document.getElementById("header-clock").innerText = timeStr;
        document.getElementById("header-date").innerText = dateStr;
        
        const punchTime = document.getElementById("punch-live-time");
        const punchDate = document.getElementById("punch-live-date");
        if (punchTime) punchTime.innerText = timeStr;
        if (punchDate) punchDate.innerText = dateStr;

        // Dynamic working hours update
        if (STATE.checkedIn) {
            // Simulated start time of 08:45 AM
            const checkInHour = 8;
            const checkInMin = 45;
            
            let hrs = now.getHours() - checkInHour;
            let mins = now.getMinutes() - checkInMin;
            
            if (mins < 0) {
                hrs -= 1;
                mins += 60;
            }
            if (hrs < 0) hrs = 0; // prevent negative bounds

            const hrsStr = hrs.toString().padStart(2, '0');
            const minsStr = mins.toString().padStart(2, '0');
            document.getElementById("kpi-hours-value").innerText = `${hrsStr}h ${minsStr}m`;
        } else {
            document.getElementById("kpi-hours-value").innerText = "--h --m";
        }
    }

    // Tick every second
    setInterval(updateClock, 1000);
    updateClock();

    // Init Lucide Icons initially
    lucide.createIcons();

    // Notify Widget interaction
    document.getElementById("btn-notifications").addEventListener("click", () => {
        alert("Notun Notification:\n- Uttara-te meeting ache: Sector 4 Loop.\n- Kheyal Korun: Target er shesh shomoy June 30.");
    });

    // -------------------------------------------------------------
    // 3. Tab Switching Mechanism
    // -------------------------------------------------------------
    const navItems = document.querySelectorAll(".nav-item");
    const panels = document.querySelectorAll(".tab-panel");
    const pageTitle = document.getElementById("page-title");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const selectedTab = item.getAttribute("data-tab");
            switchTab(selectedTab);
        });
    });

    function switchTab(tabName) {
        STATE.activeTab = tabName;

        // Toggle Active Side Menu Buttons
        navItems.forEach(btn => {
            if (btn.getAttribute("data-tab") === tabName) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // Show/Hide Panels with transition classes
        panels.forEach(panel => {
            if (panel.id === `panel-${tabName}`) {
                panel.classList.add("active");
            } else {
                panel.classList.remove("active");
            }
        });

        // Update Header Page Title
        const titleMapping = {
            home: "Overview (Ajker Dashboard)",
            map: "Beat Map (Dokan o Rasta)",
            todo: "Kaj er List (To-Do)",
            attendance: "Attendance Hajira Log",
            dealer: "Dealers Profile",
            neworder: "Notun Order Book",
            payment: "Taka Collection Record",
            report: "Bikri o Target Reports"
        };
        pageTitle.innerText = titleMapping[tabName] || "Dashboard";

        // Tab specific setup/hooks
        if (tabName === "map") {
            initializeMap();
        } else if (tabName === "dealer") {
            renderDealersTab();
        } else if (tabName === "neworder") {
            renderProductsCatalog();
            populateOrderDealerDropdowns();
            renderCart();
        } else if (tabName === "payment") {
            populatePaymentDealerDropdown();
            renderPaymentHistory();
        } else if (tabName === "todo") {
            renderTodoList();
        } else if (tabName === "report") {
            renderReports();
        }

        // Close sidebar on mobile after choosing
        document.getElementById("app-sidebar").classList.remove("open");
    }

    // Mobile Sidebar Toggle
    document.getElementById("sidebar-toggle-btn").addEventListener("click", () => {
        document.getElementById("app-sidebar").classList.add("open");
    });

    document.getElementById("sidebar-close-btn").addEventListener("click", () => {
        document.getElementById("app-sidebar").classList.remove("open");
    });

    // -------------------------------------------------------------
    // 4. Interactive Beat Map (Leaflet.js & Mock fallback)
    // -------------------------------------------------------------
    function initializeMap() {
        // Safe check for Leaflet availability
        if (typeof L === 'undefined') {
            document.getElementById("map-fallback").classList.remove("hidden");
            renderBeatListSidebar();
            return;
        }

        document.getElementById("map-fallback").classList.add("hidden");

        // Center map to cover Dhaka Gulshan/Uttara loop coordinates of our dealers
        const centerCoords = [23.8300, 90.4100]; 
        
        if (!map) {
            map = L.map('map-canvas', {
                zoomControl: true,
                attributionControl: false
            }).setView(centerCoords, 12);

            // High contrast CartoDB Dark Matter tile layer
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 19
            }).addTo(map);
        }

        // Refresh size in case the container was loaded while hidden
        setTimeout(() => {
            map.invalidateSize();
        }, 150);

        renderBeatListSidebar();
        renderMapMarkers();
    }

    function renderMapMarkers() {
        if (!map) return;

        // Clear existing markers
        mapMarkers.forEach(m => map.removeLayer(m));
        mapMarkers = [];

        const visitedCoords = [];

        STATE.dealers.forEach((dealer, idx) => {
            // Draw a color-coded neon ring dot
            const color = dealer.visitStatus === "visited" ? "#c6ff00" : "#f59e0b";
            const shadow = dealer.visitStatus === "visited" ? "rgba(198, 255, 0, 0.5)" : "rgba(245, 158, 11, 0.5)";
            
            const customIcon = L.divIcon({
                className: 'custom-map-icon',
                html: `<div style="
                    width: 14px; 
                    height: 14px; 
                    border-radius: 50%; 
                    background-color: ${color}; 
                    border: 2px solid #08090d; 
                    box-shadow: 0 0 10px ${shadow};
                    transform: scale(1);
                    transition: transform 0.2s ease;"></div>`,
                iconSize: [14, 14],
                iconAnchor: [7, 7]
            });

            const marker = L.marker([dealer.lat, dealer.lng], { icon: customIcon }).addTo(map);
            
            const popupHtml = `
                <div class="map-popup-card">
                    <div class="map-popup-title">${dealer.name}</div>
                    <div class="map-popup-text">
                        <strong>Obostha:</strong> ${dealer.visitStatus === 'visited' ? 'VISITED' : 'PENDING'}<br>
                        <strong>Channel:</strong> ${dealer.channel}<br>
                        <strong>Baki Taka:</strong> $${dealer.outstanding.toFixed(2)}
                    </div>
                    <button class="map-popup-btn" onclick="window.checkInFromMap('${dealer.id}')">
                        ${dealer.visitStatus === 'visited' ? 'Check-in Hoishe ✓' : 'Visit Likhi'}
                    </button>
                </div>
            `;
            
            marker.bindPopup(popupHtml);
            
            marker.on('click', () => {
                highlightDealerInBeatList(dealer.id);
            });

            mapMarkers.push(marker);

            // Polyline trace
            if (dealer.visitStatus === "visited") {
                visitedCoords.push([dealer.lat, dealer.lng]);
            }
        });

        // Draw visited beat route path connection (neon lime path line)
        if (visitedCoords.length > 1) {
            L.polyline(visitedCoords, {
                color: '#c6ff00',
                weight: 3,
                opacity: 0.7,
                dashArray: '5, 8'
            }).addTo(map);
        }
    }

    function renderBeatListSidebar() {
        const searchVal = document.getElementById("map-dealer-search").value.toLowerCase();
        const container = document.getElementById("map-dealer-list");
        container.innerHTML = "";

        const filtered = STATE.dealers.filter(d => d.name.toLowerCase().includes(searchVal));

        filtered.forEach((dealer, index) => {
            const isVisited = dealer.visitStatus === "visited";
            const isActive = activeMapDealerId === dealer.id;

            const div = document.createElement("div");
            div.className = `beat-dealer-item ${isVisited ? 'visited' : ''} ${isActive ? 'active' : ''}`;
            div.setAttribute("data-id", dealer.id);

            div.innerHTML = `
                <div class="dealer-number-icon">${index + 1}</div>
                <div class="dealer-beat-info">
                    <div class="dealer-beat-name">${dealer.name}</div>
                    <div class="dealer-beat-sub">${dealer.channel} &bull; Bal: $${dealer.outstanding.toFixed(2)}</div>
                </div>
                <span class="dealer-visit-badge ${isVisited ? 'visited' : 'pending'}">
                    ${isVisited ? 'Visit Shesh' : 'Baki Ache'}
                </span>
            `;

            div.addEventListener("click", () => {
                selectDealerOnMap(dealer);
            });

            container.appendChild(div);
        });
    }

    function selectDealerOnMap(dealer) {
        activeMapDealerId = dealer.id;
        
        // Toggle selected state in HTML
        document.querySelectorAll(".beat-dealer-item").forEach(item => {
            if (item.getAttribute("data-id") === dealer.id) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        // Center map coordinates on dealer and trigger popup open
        if (map) {
            map.setView([dealer.lat, dealer.lng], 14, { animate: true });
            
            // Find corresponding marker and trigger click
            const idx = STATE.dealers.findIndex(d => d.id === dealer.id);
            if (idx !== -1 && mapMarkers[idx]) {
                mapMarkers[idx].openPopup();
            }
        }
    }

    function highlightDealerInBeatList(id) {
        activeMapDealerId = id;
        document.querySelectorAll(".beat-dealer-item").forEach(item => {
            if (item.getAttribute("data-id") === id) {
                item.classList.add("active");
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                item.classList.remove("active");
            }
        });
    }

    // Expose checkin command globally so Leaflet popup string can invoke it
    window.checkInFromMap = function(id) {
        const dealer = STATE.dealers.find(d => d.id === id);
        if (dealer) {
            if (dealer.visitStatus !== "visited") {
                dealer.visitStatus = "visited";
                dealer.lastVisit = "Ajge, " + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                
                // Add timeline entry
                addTimelineActivity("Check-in Kora Hoishe: " + dealer.name, "Dokan visit hoishe o GPS verified.", "green");
                
                // Re-render
                renderMapMarkers();
                renderBeatListSidebar();
                updateKpiKPIs();
            } else {
                alert("Ei dokan ajke visited kora shesh.");
            }
        }
    };

    // Filter sidebar list on type search
    document.getElementById("map-dealer-search").addEventListener("input", renderBeatListSidebar);

    // Fallback retry button
    document.getElementById("btn-retry-map").addEventListener("click", initializeMap);


    // -------------------------------------------------------------
    // 5. To Do List Section
    // -------------------------------------------------------------
    let currentTodoFilter = "all";
    const todoAddForm = document.getElementById("todo-add-form");

    function renderTodoList() {
        const listContainer = document.getElementById("todo-items-list");
        listContainer.innerHTML = "";

        let filtered = STATE.todos;
        if (currentTodoFilter === "pending") {
            filtered = STATE.todos.filter(t => !t.completed);
        } else if (currentTodoFilter === "completed") {
            filtered = STATE.todos.filter(t => t.completed);
        }

        if (filtered.length === 0) {
            listContainer.innerHTML = `
                <div style="padding: 30px; text-align: center; color: var(--text-muted);">
                    <i data-lucide="info" style="width: 24px; height: 24px; margin-bottom: 8px;"></i>
                    <p>Ei category-te kun kaj khuje paoa jayni.</p>
                </div>
            `;
            lucide.createIcons();
            updateTodoProgress();
            return;
        }

        filtered.forEach(todo => {
            const div = document.createElement("div");
            div.className = `todo-item ${todo.completed ? 'completed' : ''}`;

            div.innerHTML = `
                <div class="todo-item-left">
                    <label class="todo-chk-label">
                        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
                        <span class="todo-checkmark"></span>
                    </label>
                    <div>
                        <div class="todo-item-title">${todo.title}</div>
                    </div>
                </div>
                <div class="todo-item-actions">
                    <span class="cat-pill pill-${todo.category}">${todo.category === 'sales' ? 'Dokan Visit' : todo.category === 'payment' ? 'Taka Collection' : 'Delivery Check'}</span>
                    <button class="btn-icon text-muted todo-delete-btn" data-id="${todo.id}">
                        <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                    </button>
                </div>
            `;

            // Event handler for checkbox complete state
            div.querySelector(".todo-checkbox").addEventListener("change", (e) => {
                toggleTodoCompleted(todo.id, e.target.checked);
            });

            // Event handler for delete button
            div.querySelector(".todo-delete-btn").addEventListener("click", () => {
                deleteTodoItem(todo.id);
            });

            listContainer.appendChild(div);
        });

        lucide.createIcons();
        updateTodoProgress();
    }

    function toggleTodoCompleted(id, val) {
        const todo = STATE.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = val;
            saveTodosToStorage();
            renderTodoList();
            
            if (val) {
                addTimelineActivity("Kaj Shesh Hoishe", `Task check-off: "${todo.title}"`, "accent");
            }
        }
    }

    function deleteTodoItem(id) {
        STATE.todos = STATE.todos.filter(t => t.id !== id);
        saveTodosToStorage();
        renderTodoList();
    }

    function saveTodosToStorage() {
        localStorage.setItem("so_todos", JSON.stringify(STATE.todos));
    }

    // Todo filters click handlers
    document.querySelectorAll(".todo-filter-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".todo-filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentTodoFilter = btn.getAttribute("data-filter");
            renderTodoList();
        });
    });

    // Form submit for adding tasks
    todoAddForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const titleInput = document.getElementById("todo-new-title");
        const catSelect = document.getElementById("todo-new-category");

        const newTodo = {
            id: "td-" + Date.now(),
            title: titleInput.value.trim(),
            category: catSelect.value,
            completed: false
        };

        STATE.todos.unshift(newTodo);
        saveTodosToStorage();
        titleInput.value = "";
        renderTodoList();
    });

    function updateTodoProgress() {
        const total = STATE.todos.length;
        const completed = STATE.todos.filter(t => t.completed).length;
        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

        // Radial Ring Circle animation calculations
        const circle = document.getElementById("todo-progress-ring");
        if (circle) {
            // Circumference of r=50 circle is 2 * PI * r = 314.15
            const circumference = 2 * Math.PI * 50;
            const offset = circumference - (pct / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }

        document.getElementById("todo-progress-pct").innerText = `${pct}%`;
        document.getElementById("todo-badge-count").innerText = STATE.todos.filter(t => !t.completed).length;

        // Sub categories details update
        const salesTot = STATE.todos.filter(t => t.category === "sales").length;
        const salesComp = STATE.todos.filter(t => t.category === "sales" && t.completed).length;
        document.getElementById("todo-count-sales").innerText = `${salesComp} / ${salesTot}`;

        const payTot = STATE.todos.filter(t => t.category === "payment").length;
        const payComp = STATE.todos.filter(t => t.category === "payment" && t.completed).length;
        document.getElementById("todo-count-payment").innerText = `${payComp} / ${payTot}`;

        const delTot = STATE.todos.filter(t => t.category === "delivery").length;
        const delComp = STATE.todos.filter(t => t.category === "delivery" && t.completed).length;
        document.getElementById("todo-count-delivery").innerText = `${delComp} / ${delTot}`;
    }


    // -------------------------------------------------------------
    // 6. Attendance punch card logging
    // -------------------------------------------------------------
    const punchBtn = document.getElementById("btn-punch-action");
    const leaveBtn = document.getElementById("btn-leave-request");
    const leaveModal = document.getElementById("leave-request-modal");

    function renderAttendanceTab() {
        // Refresh punch button UI
        if (STATE.checkedIn) {
            punchBtn.className = "punch-btn checked-in";
            document.getElementById("punch-btn-text").innerText = "CHECK OUT";
            document.getElementById("status-badge").className = "badge badge-online";
            document.getElementById("status-badge").innerHTML = `<span class="pulse-ring"></span> Duty-te Achen`;
            document.getElementById("status-dot").className = "status-indicator active";
            document.getElementById("header-gps-status").className = "gps-indicator checked-in";
            document.getElementById("header-gps-status").querySelector(".gps-label").innerText = "GPS On Ache";
            document.getElementById("att-stats-in-time").innerText = STATE.checkInTime || "08:45 AM";
            document.getElementById("att-stats-out-time").innerText = "-- : --";
            document.getElementById("att-stats-status").innerText = "Somoy Moto";
        } else {
            punchBtn.className = "punch-btn checked-out";
            document.getElementById("punch-btn-text").innerText = "DUTY SHURU (In)";
            document.getElementById("status-badge").className = "badge badge-active-status";
            document.getElementById("status-badge").innerHTML = `Duty-te Nai`;
            document.getElementById("status-dot").className = "status-indicator inactive";
            document.getElementById("header-gps-status").className = "gps-indicator";
            document.getElementById("header-gps-status").querySelector(".gps-label").innerText = "GPS Off Ache";
            document.getElementById("att-stats-in-time").innerText = STATE.checkInTime || "-- : --";
            document.getElementById("att-stats-out-time").innerText = STATE.checkOutTime || "-- : --";
            document.getElementById("att-stats-status").innerText = "Logged Out";
        }

        renderAttendanceLogs();
    }

    // Toggle duty check-in/out
    punchBtn.addEventListener("click", () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        
        if (STATE.checkedIn) {
            // Clock Out
            const confirmOut = confirm("Ajker kaj shesh kore Duty Check Out korben nki?");
            if (confirmOut) {
                STATE.checkedIn = false;
                STATE.checkOutTime = timeStr;
                localStorage.setItem("so_checked_in", "false");
                
                // Add to history log
                const dateStr = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
                
                // Calculate hours
                const checkInHrs = 8;
                let durationHrs = now.getHours() - checkInHrs;
                let durationMins = now.getMinutes() - 45;
                if (durationMins < 0) {
                    durationHrs -= 1;
                    durationMins += 60;
                }
                const durStr = `${durationHrs.toString().padStart(2, '0')}h ${durationMins.toString().padStart(2, '0')}m`;

                STATE.attendanceHistory.unshift({
                    date: dateStr,
                    checkIn: STATE.checkInTime,
                    checkOut: STATE.checkOutTime,
                    hours: durStr,
                    status: "Somoy Moto"
                });

                addTimelineActivity("Duty Check-out Hoishe", "Ajker kaj shesh o working hour log: " + durStr, "blue");
                renderAttendanceTab();
                updateKpiKPIs();
            }
        } else {
            // Clock In
            const routeConfirm = confirm("Ajker beat/route shuru korben? GPS tracking shuru hobe.");
            if (routeConfirm) {
                STATE.checkedIn = true;
                STATE.checkInTime = timeStr;
                STATE.checkOutTime = null;
                localStorage.setItem("so_checked_in", "true");

                addTimelineActivity("Duty Check-in Hoishe", "Daily route beat shuru kora hoishe. GPS monitoring active.", "green");
                renderAttendanceTab();
                updateKpiKPIs();
            }
        }
    });

    function renderAttendanceLogs() {
        const tableBody = document.getElementById("attendance-log-body");
        tableBody.innerHTML = "";

        STATE.attendanceHistory.forEach(log => {
            const tr = document.createElement("tr");
            
            const isLate = log.status === "Late";
            const badgeClass = isLate ? "warning" : "success";

            tr.innerHTML = `
                <td><strong>${log.date}</strong></td>
                <td>${log.checkIn}</td>
                <td>${log.checkOut || "-- : --"}</td>
                <td>${log.hours || "--"}</td>
                <td><span class="badge-table ${badgeClass}">${log.status}</span></td>
            `;

            tableBody.appendChild(tr);
        });
    }

    // Leave Modal actions
    leaveBtn.addEventListener("click", () => leaveModal.classList.remove("hidden"));
    document.getElementById("btn-close-leave-modal").addEventListener("click", () => leaveModal.classList.add("hidden"));
    document.getElementById("btn-cancel-leave").addEventListener("click", () => leaveModal.classList.add("hidden"));
    
    document.getElementById("leave-request-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const type = document.getElementById("leave-type").value;
        const start = document.getElementById("leave-start-date").value;
        const end = document.getElementById("leave-end-date").value;
        
        alert(`Apnar chuti er avedon (${type}) pathano hoishe ${start} theke ${end} porjonto. Manager er approval er jonno wait korun.`);
        leaveModal.classList.add("hidden");
        document.getElementById("leave-request-form").reset();
    });


    // -------------------------------------------------------------
    // 7. Dealer Details Tab
    // -------------------------------------------------------------
    let selectedDealerId = null;

    function renderDealersTab() {
        const listContainer = document.getElementById("dealer-cards-list");
        const searchInput = document.getElementById("dealer-search-input").value.toLowerCase();
        const typeFilter = document.getElementById("dealer-type-filter").value;

        listContainer.innerHTML = "";

        const filtered = STATE.dealers.filter(d => {
            const matchesSearch = d.name.toLowerCase().includes(searchInput) || d.address.toLowerCase().includes(searchInput);
            const matchesType = typeFilter === "all" || d.channel === typeFilter;
            return matchesSearch && matchesType;
        });

        if (filtered.length === 0) {
            listContainer.innerHTML = `
                <div style="padding: 30px; text-align: center; color: var(--text-muted);">
                    <i data-lucide="users" style="width: 24px; height: 24px; margin-bottom: 8px;"></i>
                    <p>No dealers found.</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        filtered.forEach(dealer => {
            const isVisited = dealer.visitStatus === "visited";
            const isActive = selectedDealerId === dealer.id;

            const div = document.createElement("div");
            div.className = `dealer-list-card ${isActive ? 'active' : ''}`;
            div.innerHTML = `
                <div class="dl-header">
                    <span class="dl-name">${dealer.name}</span>
                    <span class="dl-channel">${dealer.channel}</span>
                </div>
                <div class="dl-address">${dealer.address}</div>
                <div class="dl-footer">
                    <div>
                        <span class="dl-bal-lbl">Outstanding:</span>
                        <span class="dl-bal-val ${dealer.outstanding > 0 ? 'text-accent' : ''}">$${dealer.outstanding.toFixed(2)}</span>
                    </div>
                    <span class="dl-visit-dot ${isVisited ? 'visited' : 'pending'}">
                        <span class="dl-dot"></span>
                        ${isVisited ? 'Visit Shesh' : 'Baki'}
                    </span>
                </div>
            `;

            div.addEventListener("click", () => {
                selectDealerProfile(dealer.id);
            });

            listContainer.appendChild(div);
        });

        // Retain selected card profile view on re-render
        if (selectedDealerId) {
            const checkExist = STATE.dealers.find(d => d.id === selectedDealerId);
            if (checkExist) selectDealerProfile(selectedDealerId);
        }
    }

    function selectDealerProfile(id) {
        selectedDealerId = id;
        
        // Update active class in list cards
        document.querySelectorAll(".dealer-list-card").forEach(card => {
            card.classList.remove("active");
        });
        
        const dealer = STATE.dealers.find(d => d.id === id);
        if (!dealer) return;

        document.getElementById("dealer-detail-empty").classList.add("hidden");
        const container = document.getElementById("dealer-detail-content");
        container.classList.remove("hidden");

        const initials = dealer.name.split(" ").map(w => w[0]).join("").substring(0, 2);
        const outstandingPct = Math.min(Math.round((dealer.outstanding / dealer.creditLimit) * 100), 100);

        let progressClass = "";
        if (outstandingPct > 80) progressClass = "danger";
        else if (outstandingPct > 50) progressClass = "warning";

        container.innerHTML = `
            <div class="dd-header-row">
                <div class="dd-title-block">
                    <div class="dd-avatar">${initials}</div>
                    <div>
                        <h2 class="dd-name">${dealer.name}</h2>
                        <span class="dd-channel-tag">${dealer.channel}</span>
                    </div>
                </div>
                <div class="dd-actions-row">
                    <button class="btn btn-outline btn-sm" id="btn-dd-map"><i data-lucide="map-pin"></i> Map-a Dekhi</button>
                    <button class="btn btn-accent btn-sm" id="btn-dd-order"><i data-lucide="shopping-cart"></i> Order Nin</button>
                </div>
            </div>

            <div class="dd-info-grid">
                <div class="dd-info-box">
                    <span class="dd-info-lbl">Jogajog o Phone</span>
                    <div class="dd-info-val">${dealer.phone}</div>
                </div>
                <div class="dd-info-box">
                    <span class="dd-info-lbl">Beat Visit er Itihas</span>
                    <div class="dd-info-val">${dealer.lastVisit} &bull; <span class="text-accent">${dealer.visitStatus === 'visited' ? 'VISIT SHESH' : 'BAKI ACHE'}</span></div>
                </div>
                <div class="dd-info-box" style="grid-column: span 2;">
                    <span class="dd-info-lbl">Baki o Credit Summary (Limit: $${dealer.creditLimit.toFixed(2)})</span>
                    <div class="credit-limit-wrapper">
                        <div class="credit-progress-bar">
                            <div class="credit-progress-fill ${progressClass}" style="width: ${outstandingPct}%;"></div>
                        </div>
                        <div class="credit-text-row">
                            <span>Baki Taka: $${dealer.outstanding.toFixed(2)}</span>
                            <span>Usage: ${outstandingPct}%</span>
                        </div>
                    </div>
                </div>
                <div class="dd-info-box" style="grid-column: span 2;">
                    <span class="dd-info-lbl">Dokaner Thikana</span>
                    <div class="dd-info-val" style="font-weight: 500; font-size: 0.95rem;">${dealer.address}</div>
                </div>
            </div>

            <h3 class="dd-past-orders-title">Recent Delivery Orders</h3>
            <div class="table-container">
                <table class="custom-table" style="font-size: 0.82rem;">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>SKUs</th>
                            <th>Value</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>#ORD-9028</strong></td>
                            <td>18 Jun 2026</td>
                            <td>Citrus Energy x20, Electrolyte x12</td>
                            <td>$56.40</td>
                            <td><span class="badge-table info">En Route</span></td>
                        </tr>
                        <tr>
                            <td><strong>#ORD-8941</strong></td>
                            <td>12 Jun 2026</td>
                            <td>Premium Coffee x10, Oatmeal Cookies x15</td>
                            <td>$92.50</td>
                            <td><span class="badge-table success">Delivered</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        lucide.createIcons();

        // Bind profile action buttons
        document.getElementById("btn-dd-map").addEventListener("click", () => {
            switchTab("map");
            selectDealerOnMap(dealer);
        });

        document.getElementById("btn-dd-order").addEventListener("click", () => {
            switchTab("neworder");
            document.getElementById("cart-dealer-select").value = dealer.id;
        });
    }

    document.getElementById("dealer-search-input").addEventListener("input", renderDealersTab);
    document.getElementById("dealer-type-filter").addEventListener("change", renderDealersTab);


    // -------------------------------------------------------------
    // 8. Order Booking Cart (New Order)
    // -------------------------------------------------------------
    function populateOrderDealerDropdowns() {
        const orderSelect = document.getElementById("cart-dealer-select");
        
        // Retain selection
        const prevVal = orderSelect.value;
        orderSelect.innerHTML = `<option value="">-- Dealer Select Korun --</option>`;

        STATE.dealers.forEach(dealer => {
            orderSelect.innerHTML += `<option value="${dealer.id}">${dealer.name}</option>`;
        });

        if (prevVal) orderSelect.value = prevVal;
    }

    function renderProductsCatalog() {
        const grid = document.getElementById("products-catalog-grid");
        const searchInput = document.getElementById("catalog-search").value.toLowerCase();
        const catFilter = document.getElementById("catalog-category").value;

        grid.innerHTML = "";

        const filtered = STATE.products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchInput);
            const matchesCat = catFilter === "all" || p.category === catFilter;
            return matchesSearch && matchesCat;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--text-muted);">
                    <i data-lucide="package-search" style="width: 32px; height: 32px; margin-bottom: 8px;"></i>
                    <p>Ei name kun product khuje paoa jayni.</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        filtered.forEach(prod => {
            const isLowStock = prod.stock < 100;
            const stockText = isLowStock ? `Stock Kom: ${prod.stock}` : `Stock: ${prod.stock}`;
            const stockClass = isLowStock ? "low" : "";
 
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <div class="prod-img-box">
                    <i data-lucide="${prod.icon}"></i>
                    <span class="prod-stock-badge ${stockClass}">${stockText}</span>
                </div>
                <div class="prod-details">
                    <span class="prod-category">${prod.category === 'beverages' ? 'Drinks' : prod.category === 'snacks' ? 'Nasta' : 'Packaged Goods'}</span>
                    <span class="prod-name" title="${prod.name}">${prod.name}</span>
                </div>
                <div class="prod-footer-row">
                    <span class="prod-price">$${prod.price.toFixed(2)}</span>
                    <button class="btn btn-outline btn-sm btn-add-prod" data-id="${prod.id}">
                        <i data-lucide="plus" style="width: 14px; height: 14px;"></i> Add Korun
                    </button>
                </div>
            `;

            card.querySelector(".btn-add-prod").addEventListener("click", () => {
                addToCart(prod.id);
            });

            grid.appendChild(card);
        });

        lucide.createIcons();
    }

    function addToCart(prodId) {
        const prod = STATE.products.find(p => p.id === prodId);
        if (!prod) return;

        const cartItem = STATE.cart.find(item => item.id === prodId);
        if (cartItem) {
            cartItem.qty += 1;
        } else {
            STATE.cart.push({
                id: prod.id,
                name: prod.name,
                price: prod.price,
                qty: 1
            });
        }

        renderCart();
    }

    function renderCart() {
        const cartContainer = document.getElementById("cart-items-container");
        const emptyState = document.getElementById("cart-empty-state");
        
        cartContainer.innerHTML = "";

        if (STATE.cart.length === 0) {
            cartContainer.appendChild(emptyState);
            emptyState.classList.remove("hidden");
            document.getElementById("cart-item-count").innerText = "0 items";
            updateCartSummary(0);
            document.getElementById("btn-submit-order").disabled = true;
            return;
        }

        emptyState.classList.add("hidden");
        let totalItems = 0;
        let subtotal = 0;

        STATE.cart.forEach(item => {
            totalItems += item.qty;
            subtotal += item.price * item.qty;

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name" title="${item.name}">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} &times; ${item.qty}</div>
                </div>
                <div class="cart-item-qty-controls">
                    <button class="qty-btn btn-minus" data-id="${item.id}">-</button>
                    <span class="qty-val">${item.qty}</span>
                    <button class="qty-btn btn-plus" data-id="${item.id}">+</button>
                </div>
            `;

            div.querySelector(".btn-minus").addEventListener("click", () => adjustCartQty(item.id, -1));
            div.querySelector(".btn-plus").addEventListener("click", () => adjustCartQty(item.id, 1));

            cartContainer.appendChild(div);
        });

        document.getElementById("cart-item-count").innerText = `${totalItems} items`;
        updateCartSummary(subtotal);
        validateCartSubmitState();
    }

    function adjustCartQty(prodId, diff) {
        const itemIndex = STATE.cart.findIndex(item => item.id === prodId);
        if (itemIndex !== -1) {
            STATE.cart[itemIndex].qty += diff;
            if (STATE.cart[itemIndex].qty <= 0) {
                STATE.cart.splice(itemIndex, 1);
            }
            renderCart();
        }
    }

    function updateCartSummary(subtotal) {
        const promoDiscount = subtotal > 0 ? subtotal * 0.05 : 0; // 5% Promo discount
        const vatTax = subtotal > 0 ? (subtotal - promoDiscount) * 0.15 : 0; // 15% VAT
        const grandTotal = subtotal - promoDiscount + vatTax;

        document.getElementById("cart-subtotal").innerText = `$${subtotal.toFixed(2)}`;
        document.getElementById("cart-discount").innerText = `-$${promoDiscount.toFixed(2)}`;
        document.getElementById("cart-tax").innerText = `$${vatTax.toFixed(2)}`;
        document.getElementById("cart-total").innerText = `$${grandTotal.toFixed(2)}`;
    }

    function validateCartSubmitState() {
        const dealerId = document.getElementById("cart-dealer-select").value;
        const btn = document.getElementById("btn-submit-order");
        
        if (STATE.cart.length > 0 && dealerId !== "") {
            btn.disabled = false;
        } else {
            btn.disabled = true;
        }
    }

    document.getElementById("cart-dealer-select").addEventListener("change", validateCartSubmitState);
    document.getElementById("catalog-search").addEventListener("input", renderProductsCatalog);
    document.getElementById("catalog-category").addEventListener("change", renderProductsCatalog);

    // Book Order Click Handler
    document.getElementById("btn-submit-order").addEventListener("click", () => {
        const dealerId = document.getElementById("cart-dealer-select").value;
        const dealer = STATE.dealers.find(d => d.id === dealerId);
        if (!dealer) return;

        // Calculate totals for modal display
        const subtotalText = document.getElementById("cart-subtotal").innerText;
        const totalText = document.getElementById("cart-total").innerText;
        const orderVal = parseFloat(totalText.replace("$", ""));

        // Update sales data state
        STATE.totalSalesToday += orderVal;
        dealer.outstanding += orderVal; // order placed adds to outstanding balance
        
        // Random invoice reference
        const refNo = "ORD-" + Math.floor(10000 + Math.random() * 90000);

        // Show successful order booking modal
        document.getElementById("success-ref-num").innerText = refNo;
        document.getElementById("success-dealer-name").innerText = dealer.name;
        document.getElementById("success-total-amt").innerText = totalText;
        document.getElementById("order-success-modal").classList.remove("hidden");

        // Log to activity feeds
        addTimelineActivity("Order Book Hoishe: " + refNo, `${dealer.name}-er notun order booked, Mot: ${totalText}`, "accent");

        // Reset Cart
        STATE.cart = [];
        document.getElementById("cart-dealer-select").value = "";
        renderCart();
        updateKpiKPIs();
    });

    // Close Success Modal
    document.getElementById("btn-success-close").addEventListener("click", () => {
        document.getElementById("order-success-modal").classList.add("hidden");
    });


    // -------------------------------------------------------------
    // 9. Payment Collection Receipt Logger
    // -------------------------------------------------------------
    const paymentForm = document.getElementById("payment-collection-form");

    function populatePaymentDealerDropdown() {
        const select = document.getElementById("pay-dealer-select");
        const prevVal = select.value;
        select.innerHTML = `<option value="">-- Dealer Select Korun --</option>`;

        STATE.dealers.forEach(dealer => {
            select.innerHTML += `<option value="${dealer.id}">${dealer.name}</option>`;
        });

        if (prevVal) select.value = prevVal;
    }

    // Toggle cheque field display based on payment method
    document.querySelectorAll("input[name='pay-method']").forEach(radio => {
        radio.addEventListener("change", (e) => {
            const val = e.target.value;
            const refGroup = document.getElementById("group-cheque-ref");
            const lbl = document.getElementById("pay-ref-lbl");

            if (val === "Cheque") {
                refGroup.style.display = "flex";
                lbl.innerText = "Cheque er Number";
                document.getElementById("pay-ref").placeholder = "Cheque number eikhane din";
                document.getElementById("pay-ref").required = true;
            } else if (val === "Bank Transfer") {
                refGroup.style.display = "flex";
                lbl.innerText = "Transaction ID (Bank Ref)";
                document.getElementById("pay-ref").placeholder = "Ref ID eikhane din";
                document.getElementById("pay-ref").required = true;
            } else {
                refGroup.style.display = "none";
                document.getElementById("pay-ref").required = false;
            }
        });
    });

    function renderPaymentHistory() {
        const body = document.getElementById("payment-history-body");
        body.innerHTML = "";

        STATE.paymentHistory.forEach(pay => {
            const tr = document.createElement("tr");

            const isPending = pay.status === "Pending Clearance";
            const badgeClass = isPending ? "warning" : "success";

            tr.innerHTML = `
                <td><strong>#${pay.id}</strong></td>
                <td>${pay.dealer}</td>
                <td>${pay.dateTime}</td>
                <td>${pay.method}</td>
                <td class="text-accent"><strong>$${pay.amount.toFixed(2)}</strong></td>
                <td><span class="badge-table ${badgeClass}">${pay.status}</span></td>
            `;

            body.appendChild(tr);
        });
    }

    // Submit log receipt
    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const dealerId = document.getElementById("pay-dealer-select").value;
        const amount = parseFloat(document.getElementById("pay-amount").value);
        const method = document.querySelector("input[name='pay-method']:checked").value;
        const ref = document.getElementById("pay-ref").value;
        
        const dealer = STATE.dealers.find(d => d.id === dealerId);
        if (!dealer) return;

        // Deduct payment collection from dealer outstanding balance
        dealer.outstanding = Math.max(0, dealer.outstanding - amount);

        // Update Today KPI totals
        STATE.paymentsCollectedToday += amount;

        // Generate mock receipt entry
        const rID = "PAY-" + Math.floor(100 + Math.random() * 900);
        const now = new Date();
        const dateTimeStr = "Today, " + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

        const status = method === "Cheque" ? "Pending Clearance" : "Approved";

        const newPayment = {
            id: rID,
            dealer: dealer.name,
            dateTime: dateTimeStr,
            method: method,
            amount: amount,
            status: status
        };

        STATE.paymentHistory.unshift(newPayment);
        localStorage.setItem("so_payments", JSON.stringify(STATE.paymentHistory));

        // Activity log feed entry
        addTimelineActivity("Taka Collection: " + rID, `${dealer.name}-er kache $${amount.toFixed(2)} (${method}) neya hoishe`, "blue");

        // Clear and Reset Form
        paymentForm.reset();
        document.getElementById("group-cheque-ref").style.display = "none";
        
        renderPaymentHistory();
        updateKpiKPIs();
        alert(`Taka collection receipt #${rID} successfully save kora hoishe.`);
    });


    // -------------------------------------------------------------
    // 10. Reports Tab Section
    // -------------------------------------------------------------
    function renderReports() {
        const barsList = document.getElementById("report-category-bars");
        barsList.innerHTML = "";

        // Calculate product category sales
        const categories = {
            "Beverages": { value: 24200.00, target: 30000.00, class: "sales" },
            "Snacks": { value: 18450.00, target: 25000.00, class: "payment" },
            "Packaged Goods": { value: 15600.00, target: 20000.00, class: "delivery" }
        };

        Object.keys(categories).forEach(cat => {
            const data = categories[cat];
            const pct = Math.round((data.value / data.target) * 100);

            const div = document.createElement("div");
            div.className = "report-bar-item";
            div.innerHTML = `
                <div class="bar-labels">
                    <span>${cat}</span>
                    <span>$${data.value.toLocaleString()} / $${data.target.toLocaleString()} (${pct}%)</span>
                </div>
                <div class="bar-track">
                    <div class="bar-fill ${data.class}" style="width: ${pct}%;"></div>
                </div>
            `;
            barsList.appendChild(div);
        });

        // Load performance table details
        const tableBody = document.getElementById("report-table-body");
        tableBody.innerHTML = `
            <tr>
                <td>Thursday, Jun 18</td>
                <td>Sector 4 Retail Loop</td>
                <td>6 / 4 Checkins</td>
                <td>$320.00 (ORD-9028)</td>
                <td>$1,850.00 (2 receipts)</td>
                <td class="text-accent"><strong>$2,450.00</strong></td>
            </tr>
            <tr>
                <td>Wednesday, Jun 17</td>
                <td>Uttara Commercial Area</td>
                <td>5 / 5 Checkins</td>
                <td>$410.00 (ORD-8812)</td>
                <td>$3,500.00 (1 receipt)</td>
                <td class="text-accent"><strong>$3,200.00</strong></td>
            </tr>
            <tr>
                <td>Tuesday, Jun 16</td>
                <td>Sector 9 Wholesale Beat</td>
                <td>4 / 4 Checkins</td>
                <td>$820.00 (ORD-8740)</td>
                <td>$480.00 (1 receipt)</td>
                <td class="text-accent"><strong>$2,950.00</strong></td>
            </tr>
            <tr>
                <td>Monday, Jun 15</td>
                <td>Mirpur Road Beat</td>
                <td>8 / 6 Checkins</td>
                <td>$240.00 (ORD-8601)</td>
                <td>$0.00</td>
                <td class="text-accent"><strong>$1,800.00</strong></td>
            </tr>
            <tr>
                <td>Sunday, Jun 14</td>
                <td>Dhanmondi Retail Strip</td>
                <td>5 / 5 Checkins</td>
                <td>$900.00 (ORD-8519)</td>
                <td>$1,100.00 (1 receipt)</td>
                <td class="text-accent"><strong>$3,500.00</strong></td>
            </tr>
        `;

        // Update monthly stats totals in report tab
        const totalAchieved = 58250.00;
        const monthlyTarget = 75000.00;
        const pctAchieved = ((totalAchieved / monthlyTarget) * 100).toFixed(1);
        
        document.getElementById("rep-total-achievement").innerText = `$${totalAchieved.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
        document.getElementById("rep-remaining-target").innerText = `$${(monthlyTarget - totalAchieved).toLocaleString(undefined, {minimumFractionDigits: 2})}`;
        
        const textLabelSub = document.querySelector(".report-summary-card.text-accent .rep-sub");
        if (textLabelSub) textLabelSub.innerText = `${pctAchieved}% Puron hoishe`;
    }

    document.getElementById("btn-export-reports").addEventListener("click", () => {
        alert("Excel o PDF report ready hoche...\nJUNE_PERFORMANCE_REPORT.xlsx download complete!");
    });


    // -------------------------------------------------------------
    // 11. Core State Sync & UI Refresh Events
    // -------------------------------------------------------------
    function updateKpiKPIs() {
        // Today Sales Card
        document.getElementById("kpi-sales-value").innerText = `$${STATE.totalSalesToday.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        const targetPercent = Math.min(Math.round((STATE.totalSalesToday / 3500) * 100), 100);
        document.querySelector(".kpi-card:nth-child(1) .kpi-progress-fill").style.width = `${targetPercent}%`;
        document.querySelector(".kpi-card:nth-child(1) .kpi-footer-text:nth-child(2)").innerText = `${targetPercent}% achieved`;

        // Checkins Card
        const totalVisited = STATE.dealers.filter(d => d.visitStatus === "visited").length;
        const totalDealers = STATE.dealers.length;
        const pendingCount = totalDealers - totalVisited;
        document.getElementById("kpi-checkins-value").innerText = `${totalVisited} / ${totalDealers}`;
        document.querySelector(".kpi-card:nth-child(2) .kpi-progress-fill").style.width = `${Math.round((totalVisited/totalDealers)*100)}%`;
        
        const pendingLbl = document.querySelector(".kpi-card:nth-child(2) .kpi-percent");
        if (pendingCount > 0) {
            pendingLbl.className = "kpi-percent warning";
            pendingLbl.innerText = `Baki ${pendingCount}`;
        } else {
            pendingLbl.className = "kpi-percent positive";
            pendingLbl.innerText = `Shob Shesh`;
        }

        // Payments Collected Card
        document.getElementById("kpi-payments-value").innerText = `$${STATE.paymentsCollectedToday.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        
        // Map Sidebar Stats
        const mapVisited = document.getElementById("map-stat-visited");
        if (mapVisited) mapVisited.innerText = totalVisited;
        
        const mapPending = document.getElementById("map-stat-pending");
        if (mapPending) mapPending.innerText = pendingCount;

        const mapTotal = document.getElementById("map-stat-total");
        if (mapTotal) mapTotal.innerText = totalDealers;
    }

    function addTimelineActivity(title, desc, iconClass) {
        const timeline = document.getElementById("home-activity-timeline");
        if (!timeline) return;

        const iconMapping = {
            green: "check-circle-2",
            accent: "shopping-bag",
            blue: "dollar-sign"
        };

        const icon = iconMapping[iconClass] || "info";

        const div = document.createElement("div");
        div.className = "timeline-item";
        div.innerHTML = `
            <div class="timeline-icon ${iconClass}">
                <i data-lucide="${icon}"></i>
            </div>
            <div class="timeline-content">
                <h4 class="timeline-title">${title}</h4>
                <p class="timeline-desc">${desc}</p>
                <span class="timeline-time">Just now</span>
            </div>
        `;

        timeline.insertBefore(div, timeline.firstChild);
        lucide.createIcons();
    }

    // Refresh activity logs feed
    document.getElementById("btn-refresh-activity").addEventListener("click", () => {
        const btn = document.getElementById("btn-refresh-activity");
        btn.style.transform = "rotate(360deg)";
        setTimeout(() => {
            btn.style.transform = "rotate(0deg)";
        }, 300);
        alert("Ajker shob data main serverer shathe sync kora hoishe.");
    });

    // Chart node tooltips interactions
    const tooltip = document.getElementById("chart-tooltip");
    document.querySelectorAll(".chart-dot").forEach(dot => {
        dot.addEventListener("mouseenter", (e) => {
            const val = e.target.getAttribute("data-val");
            const day = e.target.getAttribute("data-day");
            
            tooltip.innerHTML = `<strong>${day}:</strong> ${val}`;
            tooltip.style.opacity = "1";
            
            // Position tooltip
            const rect = e.target.getBoundingClientRect();
            const parentRect = e.target.parentElement.parentElement.getBoundingClientRect();
            
            tooltip.style.left = (rect.left - parentRect.left - 20) + "px";
            tooltip.style.top = (rect.top - parentRect.top - 40) + "px";
        });

        dot.addEventListener("mouseleave", () => {
            tooltip.style.opacity = "0";
        });
    });

    // Checked out & Logout button
    document.getElementById("btn-logout").addEventListener("click", () => {
        const logoutConfirm = confirm("App theke Log Out ar Duty Check Out korben?");
        if (logoutConfirm) {
            STATE.checkedIn = false;
            STATE.checkOutTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            localStorage.setItem("so_checked_in", "false");
            
            renderAttendanceTab();
            updateKpiKPIs();
            alert("Offline achen. Duty successfully check out hoishe.");
        }
    });

    // First load state setup
    renderAttendanceTab();
    updateKpiKPIs();
});
