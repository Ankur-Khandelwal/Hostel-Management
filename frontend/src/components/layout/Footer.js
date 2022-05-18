import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer class="footer">

      <div class="footer-copyright text-center py-3">© {new Date().getFullYear()} Copyright:
         {/* DEVELOPED BY GROUP-03   */}
           <ul class="list-unstyled">
          <li>
            ANKUR KHANDELWAL
          </li>
          {/* <li>
            <a href="#!">ANMOL PANDA - B519011 </a>
          </li>
          <li>
            <a href="#!">ANSUMAN MISHRA - B519012</a>
          </li> */}
        </ul>
      </div>

    </footer>
  );
}
