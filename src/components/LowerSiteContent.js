import React from "react";

import Section from "./Section";
import FAQ from "./FAQ";

const LowerSiteContent = ({ ...rest }) => {
  return (
    <Section id="lowerSiteContent" {...rest}>
      <FAQ />
    </Section>
  );
};

export default LowerSiteContent;
