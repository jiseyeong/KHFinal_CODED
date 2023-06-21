import { Link } from "react-router-dom";

function FeedInsert() {
  return (
    <div className="container">
        <table border={1} align="center" style={{margin:"auto"}}>
            <thead>
                <tr>
                    <th>하하</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><Link to="/modal"><button>모달창</button></Link></td>
                </tr>
            </tbody>
        </table>
    </div>
  );
}

export default FeedInsert;
