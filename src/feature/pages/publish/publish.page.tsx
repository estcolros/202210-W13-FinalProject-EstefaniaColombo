import { useContext } from 'react';
import { UserContext } from '../../../core/context/user.context';
import { Add } from '../../components/add/add';

export default function PublishPage() {
    const { currentUser, users, getAdmin } = useContext(UserContext);

    return (
        <>
            <section className="publish" role="article">
                <h2>Publish new pets</h2>
                {getAdmin() ? (
                    <Add></Add>
                ) : (
                    <div>
                        <h4>You don't have permission to publish any pets</h4>
                        <br />
                        <br />
                        <img
                            src={require('./ERROR.png')}
                            alt="error"
                            width="550"
                            height="550"
                        />
                    </div>
                )}
            </section>
        </>
    );
}
