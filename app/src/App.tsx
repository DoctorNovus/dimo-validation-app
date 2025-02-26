import { useEffect } from 'react';
import './App.css';

import {
  LoginWithDimo,
  ShareVehiclesWithDimo,
  initializeDimoSDK,
  useDimoAuthState,
} from "@dimo-network/login-with-dimo";

function App() {

  initializeDimoSDK({
    clientId: process.env.REACT_APP_DIMO_CLIENT_ID!,
    redirectUri: process.env.REACT_APP_DIMO_REDIRECT_URI!,
    apiKey: process.env.REACT_APP_DIMO_API_KEY!
  });

  const { isAuthenticated, email, walletAddress } = useDimoAuthState();


  useEffect(() => {
    if (isAuthenticated) {
      //makeAuthenticatedRequest(getValidJWT())
      console.log(email);
      console.log(walletAddress);
    }
  }, [isAuthenticated, email, walletAddress])

  const permissionsEnabled = "1";

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <ShareVehiclesWithDimo
            mode="popup"
            onSuccess={(authData) => console.log("Success:", authData)}
            onError={(error) => console.error("Error:", error)}
            permissionTemplateId={"1"}
          //expirationDate={} //OPTIONAL ISO STRING
          />
        </div>
      ) : (
        <LoginWithDimo
          mode="popup"
          onSuccess={(authData) => console.log("Success:", authData)}
          onError={(error) => console.error("Error:", error)}
          permissionTemplateId={permissionsEnabled ? "1" : undefined}
        //expirationDate={} //OPTIONAL ISO STRING
        // vehicles={["585","586"]}
        />
      )}
    </div>
  );
}

export default App;
