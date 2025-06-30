export const timestampToDateTime=(timestamp)=> {
    // Create a new Date object by passing the timestamp (in milliseconds)
    const dateObject = new Date(timestamp);
  
    // You can then use various methods of the Date object to extract
    // and format the date and time components as needed.
  
    // Example: Getting individual components
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // getMonth() returns 0-11
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
  
    // Example: Formatting into a common string representation
    // This will return a string in the user's local time zone
    const formattedDateTime = dateObject.toLocaleString(); 
  
    // Example: Formatting for a specific locale and options
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    };
    const localeFormattedDateTime = dateObject.toLocaleDateString(undefined, options);
  
    // Return the formatted string or the Date object itself
    return {
      dateObject: dateObject,
      formattedLocal: formattedDateTime,
      formattedLocaleSpecific: localeFormattedDateTime,
      components: { year, month, day, hours, minutes, seconds }
    };
  }
  
  