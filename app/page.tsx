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
          "pointer-events-none relative z-0 my-[-12.8rem] h-[48rem] overflow-hidden",
          "after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-[20rem] after:bg-gradient-to-b after:from-transparent after:to-background"
        )}
      >
        <StarsIllustration />
      </div>

      <EnjoyIssueTracking />
      <BuildMomentum />
      <SetDirection />
    </>
  );
}
