import NewAttribute from '../../components/attribute/new-attribute';
import { setTitle } from '../../util/setTitle';
import Heading from '../../components/page-heading';

export default function App() {
    setTitle('Create a new Attribute');
    return (
        <div
            className="page-content"
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                maxWidth: '800px',
                marginLeft: '256px',
            }}
        >
            <Heading title={'Create a new Attribute'} isBack={true}></Heading>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    padding: '16px',
                }}
            >
                <NewAttribute />
            </div>
        </div>
    );
}
