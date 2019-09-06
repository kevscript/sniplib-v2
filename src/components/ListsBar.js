import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { openListModal, setSelectedList } from '../actions'
import ReactTooltip from 'react-tooltip'

import AddIcon from '../assets/addLight.svg'

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  background: #222831;
  width: 300px;
  padding: 25px 0 25px 25px;
  color: #f4f4f4;
`

const Header = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
  margin-top: 50px;
`

const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
`

const ListsContainer = styled.div``

const Lists = styled.ul`
`

const Item = styled.li`
  cursor: pointer;
  background: ${props => props.selected ? '#00adb5' : 'transparent'};
  border-radius: 3px 0 0 3px;
  padding: 4px 0px 4px 25px;
  margin: 2px 0;
  font-size: 16px;
`

const IconContainer = styled.div`
  cursor: pointer;
  width: 15px;
  height: 15px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.img`
  display: block;
  width: auto;
  height: 100%;
`

const ListBar = ({ lists, openListModal, setSelectedList }) => {
  const { allLists } = lists

  return (
    <Container>
      <Header>
        <Title>My Lists</Title>
        <IconContainer onClick={openListModal}>
          <Icon src={AddIcon} data-tip="Create List"/>
          <ReactTooltip place="bottom" type="dark" effect="solid"/>
        </IconContainer>
      </Header>
      <ListsContainer>
        <Lists>
          {allLists.length > 0 && allLists.map(el => {
            return (
              <Item key={el.createdAt} selected={el.selected} id={el.createdAt} onClick={() => setSelectedList(el.createdAt)}>
                {el.name}
              </Item>
            )
          })}
        </Lists>
      </ListsContainer>
    </Container>
  )
}

const mapStateToProps = state => ({
  lists: state.lists
})


const mapDispatchToProps = {
  openListModal,
  setSelectedList
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBar)