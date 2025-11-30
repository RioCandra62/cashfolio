"use client";

export default function Greeting() {
  const hour = new Date().getHours();

  let greet = "";
  if (hour < 12) {
    greet = "Good Morning 🌤️";
  } else if (hour < 18) {
    greet = "Good Afternoon ☀️";
  } else {
    greet = "Good Evening 🌙";
  }

  return <h1>{greet},</h1>;
}
