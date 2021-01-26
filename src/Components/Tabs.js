import React from "react";
import PropType, { checkPropTypes } from "prop-types";
import styled from "styled-components";

const TabContainer = styled.div``;

const TabList = styled.ul``;

const Tab = styled.li``;

const TabPanel = styled.div``;

const Tabs = () => (
    <TabContainer>
        <TabList>
            <Tab>{tabtitle}</Tab>
        </TabList>
        <TabPanel>
            content
        </TabPanel>
    </TabContainer>
);

Tabs.propTypes = {
    tabtitle:PropTypes.string.isRequired,
}

export default Tabs;