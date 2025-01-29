import React, { useEffect, useState } from 'react';

const Greetings = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // Format date as "January-29-2025"
  const formattedDate = time.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).replace(' ', '-');

  return (
    <div className="flex justify-between items-center px-8 mt-5">
      <div>
        <h1 className="text-[#f5f5f5] text-xl font-semibold tracking-wide">
          Good {time.getHours() < 12 ? 'Morning' : time.getHours() < 18 ? 'Afternoon' : 'Evening'}, Amrit
        </h1>
        <p className="text-[#ababab] text-xs">Give your best services for customers 😊</p>
      </div>
      <div className="text-right text-[#f5f5f5]">
        <p className="text-lg font-semibold">{time.toLocaleTimeString()}</p>
        <p className="text-sm text-[#ababab]">{formattedDate}</p>
      </div>
    </div>
  );
};

export default Greetings;
