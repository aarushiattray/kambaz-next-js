"use client";
import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <p id="wd-student-name">Aarushi Attray, CS4550.11597.202610</p>
      <ul>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1: HTML Examples
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2: CSS Basics
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab4" id="wd-lab4-link">
            Lab 4
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab5" id="wd-lab5-link">
            Lab 5
          </Link>
        </li>
        <li>
          <Link href="/" id="wd-kambaz-link">
            Kambaz
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/aarushiattray/kambaz-next-js"
            id="wd-github"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository
          </Link>
        </li>
        <li>
          <Link
            href="https://kambaz-node-server-app-8r00.onrender.com"
            id="wd-rootserver"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link to Root Server
          </Link>
        </li>

        <hr />

        <h2>Additional Project Links</h2>

        <li>
          <Link
            href="https://github.com/aarushiattray/kambaz-next-js/tree/quizzes"
            id="wd-newgithubbranch"
            target="_blank"
            rel="noopener noreferrer"
          >
            New GitHub Branch for Final Project (React – Quizzes)
          </Link>
        </li>

        <li>
          <Link
            href="https://github.com/aarushiattray/kambaz-node-server-app/tree/quizzes"
            id="wd-newnodeserver"
            target="_blank"
            rel="noopener noreferrer"
          >
            New Node Server App for Final Project (Quizzes branch)
          </Link>
        </li>

        <li>
          <Link
            href="https://kambaz-node-server-app-3-8lu7.onrender.com"
            id="wd-newrootserver"
            target="_blank"
            rel="noopener noreferrer"
          >
            Root Server for Final Project
          </Link>
        </li>

        <h3>Group Members (all CS4550)</h3>

        <li>Sandra Castro-Valadez (Undergrad) — castro-valadez.s@northeastern.edu</li>
        <li>Bhavya Kilambi (Undergrad) — kilambi.b@northeastern.edu</li>
        <li>Aarushi Attray (Undergrad) — attray.a@northeastern.edu</li>
        <li>Dylan Anctil (Undergrad) — anctil.d@northeastern.edu</li>
        <li>Emily Chooi (Undergrad) — emilychooi.k@northeastern.edu</li>
      </ul>
    </div>
  );
}
