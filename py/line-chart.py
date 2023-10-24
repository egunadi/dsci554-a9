import pandas as pd

def export_gdp():
    gdp_filepath = '../data/gdp.original.csv'
    
    gdp_df = pd.read_csv(gdp_filepath, delimiter=',', encoding='utf-8')
    
    gdp_df_japan = gdp_df[(gdp_df['Country or Area'] == 'Japan') & 
                                        (gdp_df['Item'] == 'Gross Domestic Product (GDP)')]
    
    gdp_df_korea = gdp_df[(gdp_df['Country or Area'] == 'Republic of Korea') & 
                                        (gdp_df['Item'] == 'Gross Domestic Product (GDP)')]
    
    gdp_df_indonesia = gdp_df[(gdp_df['Country or Area'] == 'Indonesia') & 
                                        (gdp_df['Item'] == 'Gross Domestic Product (GDP)')]

    gdp_df_china = gdp_df[(gdp_df['Country or Area'] == 'China (mainland)') & 
                                        (gdp_df['Item'] == 'Gross Domestic Product (GDP)')]

    gdp_df_singapore = gdp_df[(gdp_df['Country or Area'] == 'Singapore') & 
                                        (gdp_df['Item'] == 'Gross Domestic Product (GDP)')]
    
    gdp_df_japan = gdp_df_japan[['Year', 'Value']]
    gdp_df_japan = gdp_df_japan.rename(columns={'Value': 'Japan'})
    
    gdp_df_korea = gdp_df_korea[['Year', 'Value']]
    gdp_df_korea = gdp_df_korea.rename(columns={'Value': 'Korea'})
    
    gdp_df_indonesia = gdp_df_indonesia[['Year', 'Value']]
    gdp_df_indonesia = gdp_df_indonesia.rename(columns={'Value': 'Indonesia'})
    
    gdp_df_china = gdp_df_china[['Year', 'Value']]
    gdp_df_china = gdp_df_china.rename(columns={'Value': 'China'})
    
    gdp_df_singapore = gdp_df_singapore[['Year', 'Value']]
    gdp_df_singapore = gdp_df_singapore.rename(columns={'Value': 'Singapore'})
    
    gdp_df = gdp_df_japan \
                            .merge(gdp_df_korea, on='Year') \
                            .merge(gdp_df_indonesia, on='Year') \
                            .merge(gdp_df_china, on='Year') \
                            .merge(gdp_df_singapore, on='Year')
    
    gdp_df_unpivot = pd.melt(gdp_df, 
                             id_vars='Year', 
                             value_vars=['Japan', 'Korea', 'Indonesia', 'China', 'Singapore'])
    gdp_df_unpivot = gdp_df_unpivot.rename(columns={'variable': 'Country', 'value': 'GDP'})
    
    gdp_df_unpivot = gdp_df_unpivot[(gdp_df_unpivot['Year'] >= 1970)
                                                    & (gdp_df_unpivot['Year'] <= 2020)]
    
    gdp_df_unpivot.to_json('../data/gdp.json', orient='records')

if __name__ == '__main__':
    export_gdp()
