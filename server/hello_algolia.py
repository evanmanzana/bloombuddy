# hello_algolia.py
from algoliasearch.search_client import SearchClient

# Connect and authenticate with your Algolia app
client = SearchClient.create("O2VY3SXRXO", "37436eb3cc315d090dcde25c9dc06ec2")

# Create a new index and add a record
index = client.init_index("test_index")
record = {"objectID": 1, "name": "test_record"}
index.save_object(record).wait()

# Search the index and print the results
results = index.search("test_record")
print(results["hits"][0])
