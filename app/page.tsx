import { BuyButton } from "./buy/BuyButton";
import { AccountSettingsButton } from "./buy/UserSettings";

export default function Home() {
  return (
    <div>
      <BuyButton />
      <AccountSettingsButton />
    </div>
  );
}
