import csv

ids = []
matches = {}
prev_matches = {}

# Read data from profile database csv
with open('ProfileDatabase.csv') as csv_file:
	reader = csv.DictReader(csv_file)
	for row in reader:
		if row['Random (S)'] == "random_yes":
			# Add uid to list of people needing to be matched
			current_id = row['ID (S)']
			ids.append(current_id)

			# Add current match to list of previous matches 
			# & store previous matches in a dict.
			prev_matches_list = row["PreviousMatches (S)"].split(",")
			prev_matches_list.append(row["Match (S)"])
			prev_matches_list.remove('')
			prev_matches[current_id] = prev_matches_list

# Greedily match students, avoiding students they have already matched with
for student in ids:
	if len(ids) < 2:
		break
	for potential_match in ids:
		if len(ids) < 2:
			break
		if student == potential_match:
			continue
		if potential_match in prev_matches[student]:
			continue
		matches[student] = potential_match
		matches[potential_match] = student
		ids.remove(student)
		ids.remove(potential_match)
		break

# Write matches to output csv
with open('Matches.csv', 'w') as output_file:
	writer = csv.writer(output_file)
	writer.writerow(['Student 1', 'Student 2'])
	for match1, match2 in matches.iteritems():
		writer.writerow([match1, match2])