import { React, useMemo } from 'react';
import Card from 'react-bootstrap/Card';
import ItemList from '../item-list/ItemList';

export default function WcagGuideline(props) {


    return (

        <Card className="card-specific shadow1">

            <Card.Header className="border-bottom">

                <h2>
                    Linea guida {props.index} - {props.title}
                </h2>

                <p>
                    {props.description}
                </p>
            </Card.Header>

            <Card.Body>

                <ItemList cardList={props.criteria} type="wcag" />

            </Card.Body>

        </Card>

    )

}