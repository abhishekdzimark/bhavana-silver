// Admin Custom JS - Dropdown Toggle
console.log('Admin Custom JS Loaded');

function initDropdownToggle() {
    console.log('Attempting to initialize dropdown toggle...');

    // Try multiple selectors to find the menu
    const menuSelectors = [
        '.main-menu > li',
        '.main-menu > .menu-item',
        'nav li',
        '.navbar-nav > li'
    ];

    let menuItems = [];
    for (const selector of menuSelectors) {
        menuItems = document.querySelectorAll(selector);
        if (menuItems.length > 0) {
            console.log('Found menu items with selector:', selector, '- Count:', menuItems.length);
            break;
        }
    }

    if (menuItems.length === 0) {
        console.warn('No menu items found yet, will retry...');
        return false;
    }

    menuItems.forEach(function (item, index) {
        const link = item.querySelector('a');
        const submenu = item.querySelector('ul');

        if (submenu && link) {
            console.log('Menu', index, 'has submenu:', link.textContent.trim());

            link.addEventListener('click', function (e) {
                console.log('Clicked:', link.textContent.trim());
                console.log('Current active state:', item.classList.contains('active'));

                const wasActive = item.classList.contains('active');

                // Close all menus first
                menuItems.forEach(function (mi) {
                    mi.classList.remove('active');
                });

                // If it wasn't active, make it active (toggle behavior)
                if (!wasActive) {
                    item.classList.add('active');
                    console.log('✅ Opened menu');
                } else {
                    console.log('❌ Closed menu');
                }

                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        }
    });

    console.log('✅ Dropdown toggle initialized successfully!');
    return true;
}

// Try to initialize with retries
let attempts = 0;
const maxAttempts = 10;

function tryInit() {
    attempts++;
    console.log(`Initialization attempt ${attempts}/${maxAttempts}`);

    if (initDropdownToggle()) {
        console.log('🎉 Success!');
    } else if (attempts < maxAttempts) {
        setTimeout(tryInit, 300);
    } else {
        console.error('❌ Failed to find menu after', maxAttempts, 'attempts');
    }
}

// Start trying
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
} else {
    tryInit();
}
