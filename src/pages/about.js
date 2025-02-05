import React from 'react';
import Head from 'next/head';
import Header from '@components/Header';

export default function About() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Head>
        <title>About Us</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="pt-24 flex flex-1 justify-center items-center">
        <div className="max-w-2xl p-4">
          <h1 className="text-2xl font-bold mb-4">About Bodybuilding Events Explorer</h1>
          <p>Welcome to Bodybuilding Events Explorer – your ultimate destination for discovering and tracking bodybuilding competitions.</p>
          <h2 className="text-xl font-semibold mt-4">Our Mission</h2>
          <p>We created Bodybuilding Events Explorer to solve a common challenge in the bodybuilding community: finding competitions that align with your goals, location, and schedule. Whether you are a seasoned competitor or just starting your bodybuilding journey, staying updated on events can be overwhelming. Our mission is to simplify this process, making it easy for athletes, coaches, and fans to explore upcoming bodybuilding events effortlessly.</p>
          <h2 className="text-xl font-semibold mt-4">Why We Built It</h2>
          <p>Bodybuilding is a sport that demands dedication, discipline, and precise planning. Yet, many competitors struggle to find the right competitions that fit their category, federation, and availability. We saw a need for a centralized, user-friendly platform that aggregates all bodybuilding events, so competitors can search, filter, and track the ones that matter most to them.</p>
          <p>With Bodybuilding Events Explorer, you can:</p>
          <ul className="list-disc list-inside">
            <li>✔ Browse competitions by date, location, and organization.</li>
            <li>✔ Filter events based on categories such as amateur, pro, and natural bodybuilding.</li>
            <li>✔ Stay updated with event details, deadlines, and registration links.</li>
            <li>✔ Plan ahead by setting reminders for key events on your calendar.</li>
          </ul>
          <h2 className="text-xl font-semibold mt-4">Who It's For</h2>
          <p>Bodybuilders looking for their next competition.</p>
          <p>Coaches & Trainers helping athletes strategize their competitive season.</p>
          <p>Fans & Enthusiasts who want to follow and attend bodybuilding events.</p>
          <p>Federations & Organizers aiming to promote their competitions to the right audience.</p>
          <h2 className="text-xl font-semibold mt-4">Join Us in Growing the Community</h2>
          <p>Bodybuilding is more than just a sport—it’s a lifestyle. Our goal is to empower athletes by providing the tools they need to succeed in their competition journey. Whether you're aiming for your first show or preparing for the big stage, Bodybuilding Events Explorer is here to guide you.</p>
          <p>Start exploring today and never miss an event again!</p>
          <p>Contact US : </p>
        </div>
      </div>
    </div>
  );
}
