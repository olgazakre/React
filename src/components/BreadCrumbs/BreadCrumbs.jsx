import React from "react";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({ links }) {
  return (
    <nav className={styles.Breadcrumbs}>
      <ul className={styles.List} >
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url}>{link.label}</a>
          </li>
        ))}
      </ul>
      </nav>
    
  );
}
