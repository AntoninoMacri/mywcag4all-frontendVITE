import { React, useMemo } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import RankingCard from '../ranking-card/RankingCard';

function RankingList(props) {

    const list = useMemo(() => {

        return (
            props.rankingList ?

                props.rankingList.map((element, index) => (
                    <RankingCard username={element.user.username} totalScore={element.totalScore} totalWebsite={element.count} position={index + 1} as="li" key={`rnkg-itm-${index}`} />
                ))

                :

                (
                    <span>
                        nessun dato...riprova più tardi
                    </span>
                )

        )

    }, [props.rankingList])

    return (
        <ListGroup as="ol" className="ranking-list">
            {list}
        </ListGroup>
    )
}

export default RankingList;