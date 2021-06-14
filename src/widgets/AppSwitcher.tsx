import * as React from "react";

interface AppSwitcherProps {
  token: string;
}

class AppSwitcher extends React.Component<AppSwitcherProps> {
  isMounted = false;

  constructor(props: AppSwitcherProps) {
    super(props);
    this.state = { destinations: [] };
  }

  fetchDestinations = async () => {
    const { token } = this.props;
    const response = await fetch(
      "http://localhost:4200/licensing/v1/destinations/",
      {
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    const result = await response.json();

    if (this.isMounted) {
      this.setState({ destinations: result.destinations });
    }
  };

  componentDidMount() {
    this.isMounted = true;
    this.fetchDestinations();
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render = () => {
    const { destinations }: any = this.state;

    return (
      <div>
        Destinations:{" "}
        {destinations.map((destination: any, key: number) => (
          <div key={key}>
            {destination.name} --- {destination.url}
          </div>
        ))}
      </div>
    );
  };
}

export default AppSwitcher;
