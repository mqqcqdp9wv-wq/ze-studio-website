import classNames from "classnames";
import { Container } from "../components/container";
import { StarsIllustration } from "../components/icons/stars";
import { BuildMomentum } from "../components/sections/build-momentum";
import { Clients } from "../components/sections/clients";
import { EnjoyIssueTracking } from "../components/sections/enjoy-issue-tracking";
import { HomepageHero } from "../components/sections/homepage-hero";
import { SetDirection } from "../components/sections/set-direction";
import { UnlikeAnyTool } from "../components/sections/unlike-any-tool";
import { EngineeringCulture } from "../components/sections/engineering-culture";
import { EngineeringApproach } from "../components/sections/engineering-approach";

export default function Homepage() {
  return (
    <>
      <div className="overflow-hidden pb-[16.4rem] md:pb-[25.6rem]">
        <HomepageHero />
      </div>
      <Container>
        <Clients />
      </Container>

      <div
        className={classNames(
          "pointer-events-none relative z-0 my-[-12.8rem] h-[60rem] overflow-hidden",
          "[--color:#4A7BF7] before:absolute before:inset-0 before:bg-radial-faded before:opacity-[0.25]"
        )}
      >
        <StarsIllustration />
      </div>

      <div className="relative z-10">
        <EngineeringApproach />
      </div>

      <EnjoyIssueTracking />
      <BuildMomentum />
      <SetDirection />
    </>
  );
}
