import Card from "react-bootstrap/Card";
//Card Component for displaying Study Guides in the User page
export default function CardComponent({props}){
    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                   Author: {props.createdBy}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}