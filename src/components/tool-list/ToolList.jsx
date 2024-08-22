import { React, useState, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ToolCard from "../tool-card/ToolCard";
import Tab from "react-bootstrap/Tab";
import ContainerB from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ToolList({ tools }) {
  const [selected, setSelectedTool] = useState();
  const focusRef = useRef();

  const handleClick = (index) => {
    setSelectedTool(index);
  }

  return (
    <>
      <Tab.Container ref={focusRef}>
        <ContainerB>
          <Row>
            <Col xs={3} className="p-0">
              <ListGroup defaultActiveKey="#1" id="tool_list" role="tablist" aria-controls="test_tools_list">
                {tools?.map((tool_element, index) => (
                  <ListGroup.Item
                    action
                    href={`#${index}`}
                    onClick={handleClick}
                    role="tab"
                    aria-controls={`#${index}`}
                  >
                    {tool_element.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col className="p-0">
              <Tab.Content id="test_tools_list" role="region" aria-live="polite">
                {tools?.map((tool_element, index) => (
                  <Tab.Pane id={`#${index}`} eventKey={`#${index}`} role="tabpanel" >
                    <ToolCard  ref={focusRef} tabindex="1" id={selected} data={tool_element} index={index}/>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </ContainerB>
      </Tab.Container>
    </>
  );
}
