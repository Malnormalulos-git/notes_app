const formatDate = (date : string) => {  
  return new Date(date).toLocaleString('uk-UA', {
                                          day: '2-digit',
                                          month: '2-digit',
                                          year: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                          second: '2-digit',
                                          hour12: false
                                        }
                                      );
}

export default formatDate;