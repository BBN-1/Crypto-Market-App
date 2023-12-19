// formats number for proper displaying by adding colons and limiting decimal to 2

export const formatNumberWithColons = (numberString) => {
    if (!numberString || isNaN(parseFloat(numberString))) {
        return; // Exit early for invalid input
    } else {
        const parts = numberString.split(".");
        const integerPart = parts[0].replace(/,/g, ""); // Remove commas if present
        const decimalPart = parts[1] || "";

        let formattedIntegerPart = integerPart.replace(/^:/, ""); // Remove leading colon if present

        if (formattedIntegerPart.length >= 6) {
            // If the integer part has six or more digits, remove all decimals
            return formattedIntegerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // Ensure exactly two decimal places
        const formattedDecimalPart = decimalPart.substring(0, 2);

        // Add a colon every three digits from the right
        formattedIntegerPart = formattedIntegerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
        );

        // Handle the case when there's no integer part
        if (!formattedIntegerPart) {
            formattedIntegerPart = "0";
        }

        const formattedNumber = formattedDecimalPart.length
            ? formattedIntegerPart + "." + formattedDecimalPart
            : formattedIntegerPart;

        return formattedNumber;
    }
};
