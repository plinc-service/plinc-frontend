"use client";

import React, { memo } from "react";

interface FormattedDateProps {
  dateString: string;
}

export const FormattedDate: React.FC<FormattedDateProps> = memo(
  ({ dateString }) => {
    const date = new Date(dateString).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });

    const time = new Date(dateString).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const formattedDate = date.replace(/\b\w/g, (c) => c.toUpperCase());

    return <>{`${formattedDate} à ${time}`}</>;
  }
);

FormattedDate.displayName = "FormattedDate";
