document.addEventListener("DOMContentLoaded", function () {
    function showPopup(type) {
        const popupId = type === "custom" ? "custom-popup" : "age-verification-popup";
        const popup = document.getElementById(popupId);
        const body = document.body;

        if (popup) {
            popup.classList.remove("hidden");
            popup.classList.add("fade-in");
            body.style.overflow = "hidden"; // Prevent scrolling
            console.log(`Showing popup: ${popupId}`); // Debugging
        } else {
            console.log(`Popup not found: ${popupId}`); // Debugging
        }
    }

    function closePopup(type) {
        const popupId = type === "custom" ? "custom-popup" : "age-verification-popup";
        const popup = document.getElementById(popupId);
        const body = document.body;

        if (popup) {
            popup.classList.remove("fade-in");
            popup.classList.add("fade-out");
            setTimeout(() => popup.classList.add("hidden"), 500);
        }
        body.style.overflow = "visible"; // Allow scrolling
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + "; path=/" + expires;
    }

    function getCookie(name) {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith(name + "="))
            ?.split("=")[1];
    }

    function shouldShowPopup() {
        const currentPage = window.currentPage.toLowerCase();
        const allowedPages = window.allowedPages.map(page => page.toLowerCase().trim()) || [];
        const allowedCollections = window.allowedCollections.map(collection => collection.toLowerCase().trim()) || [];
        const customMessagePages = window.customMessagePages.map(page => page.toLowerCase().trim()) || [];

        const isAllowedPage = allowedPages.some(page => currentPage.includes(`/pages/${page}`));
        const isAllowedCollection = allowedCollections.some(collection => currentPage.includes(`/collections/${collection}`));
        const isCustomPage = customMessagePages.some(page => currentPage.includes(`/pages/${page}`));

        console.log("Current Page:", currentPage);
        console.log("Allowed Pages:", allowedPages);
        console.log("Allowed Collections:", allowedCollections);
        console.log("Custom Message Pages:", customMessagePages);
        console.log("isAllowedPage:", isAllowedPage);
        console.log("isAllowedCollection:", isAllowedCollection);
        console.log("isCustomPage:", isCustomPage);

        return {
            showAgePopup: (isAllowedPage || isAllowedCollection) && getCookie("ageVerified") !== "true",
            showCustomPopup: isCustomPage
        };
    }

    const { showAgePopup, showCustomPopup } = shouldShowPopup();

    if (showCustomPopup) {
        showPopup("custom");
    } else if (showAgePopup) {
        showPopup("ageVerification");
    }

    window.checkAge = function (isAdult) {
        if (isAdult) {
            setCookie("ageVerified", "true", 1);
            closePopup("ageVerification");
        } else {
            // preventive behaviour
            window.location.href = "/";
        }
    };

    window.checkConfirm = function (confirm, customLink = '/') {
        console.log("Redirecting to:", customLink); // Debugging output
        if (confirm) {
            closePopup("custom");
        }
        if (!customLink) {
            closePopup("custom");
            // window.location.href = customLink;
        } else {
            window.location.href = "/";
        }
    };

    if (window.useCustomOptions) {
        const yesButton = document.getElementById("yes-button");
        const noButton = document.getElementById("no-button");

        if (yesButton && window.customYesButtonLink) {
            yesButton.addEventListener("click", () => {
                window.location.href = window.customYesButtonLink;
            });
        }

        if (noButton && window.customNoButtonLink) {
            noButton.addEventListener("click", () => {
                window.location.href = window.customNoButtonLink;
            });
        }
    }
});
