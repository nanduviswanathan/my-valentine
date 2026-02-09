import { useState, useEffect } from 'react';

/**
 * Custom hook to get the current date for the Valentine's app.
 * Allows overriding the date via URL query parameter `?date=YYYY-MM-DD` for testing.
 * @returns {Date} The current date logic uses.
 */
export function useValentineDate() {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const dateParam = params.get('date');

        if (dateParam) {
            const parsedDate = new Date(dateParam);
            // Validate date
            if (!isNaN(parsedDate.getTime())) {
                setCurrentDate(parsedDate);
                console.log(`Debug Mode: Date overridden to ${dateParam}`);
            }
        } else {
            // Logic to update date if the user keeps the tab open overnight?
            // For now, just setting it once on load is fine, or setting an interval.
            const timer = setInterval(() => {
                const now = new Date();
                // Check if day changed
                if (now.getDate() !== currentDate.getDate()) {
                    setCurrentDate(now);
                }
            }, 60000); // Check every minute

            return () => clearInterval(timer);
        }
    }, []);

    return currentDate;
}
