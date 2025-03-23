$(document).ready(() => {
    var count_group = $(".slider-list .slider-item").length;
    var active = 0;
    var begin = true;
    var timeAutoNext = 4000; // 4 seconds for auto slide
    var runAutoRun;
    var birdTimeout;

    function Load() {
        if (begin) {
            begin = false;
        } else {
            $("#item_" + (active - 2 < -1 ? count_group - 2 : active - 2 < 0 ? count_group - 1 : active - 2)).removeClass("hide");
            $("#item_" + (active - 1 < 0 ? count_group - 1 : active - 1)).removeClass("active");
            $("#item_" + (active - 1 < 0 ? count_group - 1 : active - 1)).addClass("hide");
        }

        $("#item_" + active).removeClass("hide");
        $("#item_" + active).addClass("active");

        $(".dots-page div").removeClass("active");
        $("#dot_" + active).addClass("active");
        $(".slider-effect").addClass("start");
        beginPosition();

        // Clear any existing auto-run timeout
        clearTimeout(runAutoRun);
        clearTimeout(birdTimeout);
        
        // Make the bird visible again
        $(".slider-birt").removeClass("bird-hidden");
        $(".slider-content").removeClass("expanded");
        
        // Set timeout to hide the bird after 12 seconds
        birdTimeout = setTimeout(() => {
            $(".slider-birt").addClass("bird-hidden");
            $(".slider-content").addClass("expanded");
        }, 12000);
        
        // Set up the next auto-run
        runAutoRun = setTimeout(() => {
            Next();
        }, timeAutoNext);
    }

    function beginPosition() {
        setTimeout(() => {
            $(".slider-effect").removeClass("start");
        }, 3000);
    }

    function Next() {
        active = active + 1 >= count_group ? 0 : active + 1;
        Load();
    }

    // Add the Prev function
    function Prev() {
        active = active - 1 < 0 ? count_group - 1 : active - 1;
        Load();
    }

    // Next button click event
    $("#slider-next").on("click", () => {
        Next();
    });

    // Prev button click event
    $("#slider-prev").on("click", () => {
        Prev();
    });

    // Initialize the slider
    Load();

    // Navbar toggle
    $("#navbar-show-btn").click(function() {
        $("#navbar-collapse").addClass("show-navbar");
    });

    $("#navbar-close-btn").click(function() {
        $("#navbar-collapse").removeClass("show-navbar");
    });
    
    // WhatsApp booking functionality
    $("#whatsapp-book").on("click", function() {
        // Get form values
        const name = $("#name").val();
        const email = $("#email").val();
        const phone = $("#phone").val();
        const date = $("#date").val();
        const guests = $("#guests").val();
        const message = $("#message").val();
        
        // Create WhatsApp message
        let whatsappMessage = `Hello, I want to book a trip to Ouzoud Waterfalls\n`;
        whatsappMessage += `Name: ${name}\n`;
        whatsappMessage += `Email: ${email}\n`;
        whatsappMessage += `Phone: ${phone}\n`;
        whatsappMessage += `Date: ${date}\n`;
        whatsappMessage += `Guests: ${guests}\n`;
        whatsappMessage += `Message: ${message}`;
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Open WhatsApp with the message
        window.open(`https://web.whatsapp.com/send?phone=212643562320&text=${encodedMessage}`, '_blank');


    });
});