import styled from 'styled-components';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Widget = styled.div`
  width: 90%;
  height: 100px;
  margin: 10px 10px 10px 10px;
  box-shadow: 0 0 3px grey;
  border-radius: 6px;
  padding: 10px 10px 10px 10px;
`;

const WidgetImage = styled.img`
  width: 100px;
  border-radius: 5px;
  float: left;
`;

const WidgetContent = styled.div`
  display: flex;
  flex-direction: column;
  ul {
    margin: 0px;
    li {
      list-style-type: none;
    }
  }
`;

export default function Home({ profilesOk }) {
  const [teste, setTeste] = React.useState([]);

  React.useEffect(() => {
    setTeste(profilesOk);
    console.log(teste);
  }, [profilesOk]);

  return (
    <Box>
      <input className="user"/>
      <button onClick={() => {}}>TETEEE</button>
      {teste.map((profile, index) => (
        <Widget key={index}>
          <WidgetImage src={profile.avatar_url} />
          <WidgetContent>
            <ul>
              <li>Nome: {profile.name}</li>
              <li>Bio: {profile.bio}</li>
              <li>User: {profile.login}</li>
              <li>
                Profile: <a href={profile.url}>{profile.url}</a>
              </li>
            </ul>
          </WidgetContent>
        </Widget>
      ))}
    </Box>
  );
}

async function profileResult(profi) {
  let headers = new Headers();
  headers.append('Authorization', 'Basic' + 'pierry');
  const re = await fetch(`https://api.github.com/users/${profi}`, {
    method: 'GET',
    headers: headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((error) => {
      return error.json;
    });
  return re;
}

async function analiseArray(arr) {
  console.log(arr)
  let getProfiles = [];
  await arr.map(async (results) => {
    getProfiles = [...getProfiles, profileResult(results)];
  });
  return Promise.all(getProfiles);
}

export async function getServerSideProps(context) {
  const profiles = ['ruangervasi', 'pierry', 'lucasselliach',"andrebaltieri","jpedroschmitz", "wesleywillians"];

  try {
    let profilesOk = await analiseArray(profiles);
    return {
      props: {
        profilesOk,
        
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}