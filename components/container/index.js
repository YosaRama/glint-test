// Libs
import { Col } from "antd";
import propTypes from "prop-types";

// Style
import s from "./index.module.scss";

function MainContainer(props) {
  const { sectionclass, containerClass, children } = props;
  return (
    <section className={s.section + " " + sectionclass}>
      <Col className={s.container + " " + containerClass} {...props}>
        {children}
      </Col>
    </section>
  );
}

MainContainer.propTypes = {
  sectionclass: propTypes.string,
  containerClass: propTypes.string,
  children: propTypes.node,
};

export default MainContainer;
