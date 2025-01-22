import { Tab } from "@material-ui/core";
import { StyledTabs, TabWrapper, Wrapper } from "./index.styled";
import { ReactNode, useState } from "react";
import { MD } from "../../../utils/theme";
import useWindowSize from "../../../hooks/useWindowSize";
import ThemedDivider from "../../elements/ThemedDivider";
import ChangePasswordTab from "./components/ChangePasswordTab";

interface ITabData {
  label: string;
  content: ReactNode;
}

const SettingsTemplate = () => {
  const tabs: ITabData[] = [
    { label: "Change password", content: <ChangePasswordTab /> },
  ];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const isDesktop = useWindowSize().width > MD;

  return (
    <Wrapper isHorizontal={!isDesktop}>
      <StyledTabs
        orientation={isDesktop ? "vertical" : "horizontal"}
        variant="scrollable"
        value={selectedTabIndex}
        onChange={(_, index) => setSelectedTabIndex(index)}
        style={
          isDesktop
            ? {
                minWidth: "fit-content",
              }
            : undefined
        }
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.label}
            label={tab.label}
            style={{
              textTransform: "none",
            }}
          />
        ))}
      </StyledTabs>
      <ThemedDivider
        orientation={isDesktop ? "vertical" : "horizontal"}
        style={{ height: isDesktop ? "inherit" : "1px" }}
      />
      {tabs.map((tab, index) =>
        index === selectedTabIndex ? (
          <TabWrapper key={tab.label}>{tab.content}</TabWrapper>
        ) : undefined
      )}
    </Wrapper>
  );
};

export default SettingsTemplate;
