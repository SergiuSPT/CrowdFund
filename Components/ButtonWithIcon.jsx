import { Button } from 'semantic-ui-react'

const ButtonWithIcon = (props) => (
  <div>
    <Button floated="right" content={props.text} icon={props.icon} labelPosition="left" primary/>
  </div>
)

export default ButtonWithIcon;
