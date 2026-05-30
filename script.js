document.addEventListener('DOMContentLoaded', function () {
    var toastEl = document.getElementById('liveToast');
    var toast = toastEl ? new bootstrap.Toast(toastEl) : null;
    var toastBody = toastEl ? toastEl.querySelector('.toast-body') : null;

    function showMessage(message) {
        if (toast && toastBody) {
            toastBody.textContent = message;
            toast.show();
        } else {
            alert(message);
        }
    }

    document.querySelectorAll('.menu-card .btn').forEach(function (button) {
        button.addEventListener('click', function () {
            var title = this.closest('.menu-card').querySelector('.card-title').textContent;
            showMessage(title + ' has been added to your order.');
        });
    });

    var reservationForm = document.querySelector('#reservation form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function (event) {
            event.preventDefault();

            var name = reservationForm.querySelector('input[type="text"]').value.trim();
            var date = reservationForm.querySelector('input[type="date"]').value;
            var time = reservationForm.querySelector('input[type="time"]').value;
            var guests = reservationForm.querySelector('select').value;

            if (!name || !date || !time || guests === 'Choose...') {
                showMessage('Please complete all reservation details before submitting.');
                return;
            }

            showMessage('Thanks, ' + name + '! Your reservation for ' + guests + ' people is confirmed for ' + date + ' at ' + time + '.');
            reservationForm.reset();
        });
    }

    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    function setActiveLink() {
        var fromTop = window.scrollY + 120;

        navLinks.forEach(function (link) {
            var section = document.querySelector(link.hash);
            if (!section) return;

            if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    var navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 30) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
});
