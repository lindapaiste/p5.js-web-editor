import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from '../theme';

const RootPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: ${prop('primaryTextColor')};
  overflow: hidden;
  background-color: ${prop('backgroundColor')};
  /* height: ${({ fixedHeight }) => fixedHeight || 'initial'}; */
`;

RootPage.propTypes = {
  fixedHeight: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default RootPage;
