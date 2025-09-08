#include <iostream>
using std::cout;

int add(int x, int y)
{
	return x + y;
}

int main()
{
	int total = add(3, 4);
	cout << "3 + 4 is " << total << '\n';

	return 0;
}

