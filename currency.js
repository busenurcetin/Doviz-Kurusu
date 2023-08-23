class Currency {
  constructor() {
    this.url = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_2pbgKu45nQ1bvPbijkO4GhXE8nC0uC4Y4dXgafgc&base_currency=`;
  }

  async getCurrencies() {
      try {
          const response = await fetch(this.url);
          if (!response.ok) {
              throw new Error("Failed to fetch currency data");
          }
          const data = await response.json();
          console.log("API Response:", data);
          if (!data || !data.data) {
              throw new Error("Invalid currency data format");
          }
          return Object.keys(data.data);
      } catch (error) {
          console.error("Error fetching currencies:", error);
          return [];
      }
  }

  async exchange(amount, firstCurrency, secondCurrency) {
      try {
          const currencies = await this.getCurrencies();
          if (!currencies.includes(firstCurrency) || !currencies.includes(secondCurrency)) {
              console.error("Invalid currency selection.");
              return null;
          }

          const response = await fetch(`${this.url}${firstCurrency}`);
          const result = await response.json();
          const exchangedResult = amount * result.data[secondCurrency];
          return exchangedResult;
      } catch (error) {
          console.error("Error exchanging currency:", error);
          return null;
      }
  }
}